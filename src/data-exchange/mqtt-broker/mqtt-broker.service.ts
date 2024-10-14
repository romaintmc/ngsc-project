import { Injectable, Logger} from '@nestjs/common';
import * as mqtt from 'mqtt';
import { Sensor, MqttProtocol} from 'src/sensor/sensor.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {DataEntity} from "src/sensor/entity/data.entity";
import { SensorEntity } from "src/sensor/entity/sensor.entity";

@Injectable() 
export class MqttBrokerService 
{
   private brokers: { [id: number]: mqtt.MqttClient } = {}; // Store broker clients
   constructor(
    @InjectRepository(DataEntity)
    private readonly dataRepository: Repository<DataEntity>,  // Le repository pour l'entité
    @InjectRepository(SensorEntity)
    private readonly sensorRepository: Repository<SensorEntity>  // Le repository pour l'entité
  ){}
   
   private readonly logger = new Logger(MqttBrokerService.name);

   addBroker(mqttProtocol : Partial<MqttProtocol>, sensor :  Sensor): void {
      if (this.brokers[mqttProtocol.id]) {
        this.logger.warn(`Broker with id ${mqttProtocol.id} already exists, list of brokers ${this.brokers}`);
        return;
      }

      const newClient = mqtt.connect(mqttProtocol.url, mqttProtocol)

      newClient.on('connect', () => { // "=>" makes it so that "this" in the newClient.on context is still referring to MqttBrokerService
         this.logger.log(`Connected to broker ${mqttProtocol.id} at ${mqttProtocol.url}`);
       });

       newClient.on('error', (error) => { // .on is because newClient is of type EventEmitter, 1st arg is the event flag
         this.logger.error(`Error in broker ${mqttProtocol.id}:`, error);
       });

       this.brokers[mqttProtocol.id] = newClient;
       this.subscribeToTopic(mqttProtocol, sensor);
   }

   subscribeToTopic(mqttProtocol : Partial<MqttProtocol>, sensor : Sensor): void {
      const client = this.brokers[mqttProtocol.id];
      if (client) 
      {
        client.subscribe(mqttProtocol.topic, {}, (err) => 
        {
            if (err) 
            {
               this.logger.error(`Failed to subscribe to topic ${mqttProtocol.topic} on broker ${mqttProtocol.id}`);
            }
            else 
            {
               this.logger.log(`Subscribed to topic ${mqttProtocol.topic} on broker ${mqttProtocol.id}`);
            }
        });

        client.on('message', (topic, message) => 
        {
          const payload = message.toString();
          this.logger.log(`Message received on topic ${topic}: ${payload}`);
                    //formatData(rawData); --> return payload(s) + unit(s) FORMAT REAL SENSOR DATA BEFORE SENDING, seperate payload and unit depending on returned data
          const unit = "MQTT unit"
          this.sendToDatabase(sensor, +payload, unit);

        });
      }
      else 
      {
        this.logger.warn(`Broker with id ${mqttProtocol.id} not found.`);
      }
   }

   async sendToDatabase(sensor: Sensor, payload: number, unit: string): Promise<void>
    {
      const sensorEntity = await this.sensorRepository.findOne({ where: { sensor_id: sensor.sensor_id } });
      const newData = this.dataRepository.create({
        value: payload,
        unit: unit,
        sensor : sensorEntity
      });
       // Save the data entity to the database
      await this.dataRepository.save(newData);
    }

   deleteBroker(mqttProtocol: Partial<MqttProtocol>): void {
      const client = this.brokers[mqttProtocol.id];
      if (client) {
        client.end();
        delete this.brokers[mqttProtocol.id];
        this.logger.log(`Disconnected broker ${mqttProtocol.id}`);
      } else {
        this.logger.warn(`Broker with id ${mqttProtocol.id} not found.`);
      }
    }
  
}