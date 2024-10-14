import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as net from 'net'; 
import { Sensor, TcpProtocol} from 'src/sensor/sensor.interface';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {DataEntity} from "src/sensor/entity/data.entity";
import { SensorEntity } from "src/sensor/entity/sensor.entity";

@Injectable()
export class TcpService {
    
  private clients: { [id: number]: { socket: net.Socket, protocol: Partial<TcpProtocol> } } = {}; // Store TCP clients with their protocol param
   private readonly logger = new Logger(TcpService.name);
   constructor(
    @InjectRepository(DataEntity)
    private readonly dataRepository: Repository<DataEntity>,  // Le repository pour l'entité
    @InjectRepository(SensorEntity)
    private readonly sensorRepository: Repository<SensorEntity>  // Le repository pour l'entité
  ){}
   connect(tcpProtocol : Partial<TcpProtocol>, sensor :  Sensor): void {
      if (this.clients[tcpProtocol.id]) {
        this.logger.warn(`Client with id ${tcpProtocol.id} already exists. list of clients ${this.clients}`);
        return;
      }

      const newSocket = net.createConnection(tcpProtocol.port, tcpProtocol.host) // This function creates a new net.Socket with all 
      // options set to default, immediately initiates connection with socket.connect(port[, host][, connectListener]),
      // then returns the net.Socket that starts the connection.

      // new client is "interface ReadableStream extends EventEmitter" and "interface WritableStream extends EventEmitter"
      newSocket.on('connect', (message) => { // .on is because newSocket is of type EventEmitter, 1st arg is the event flag
        this.logger.log(`Client ${tcpProtocol.id} connected to server adress ${tcpProtocol.host} and port ${tcpProtocol.port} :`);
      });

      newSocket.on('error', (error) => { 
         this.logger.error(`Error in TCP client ${tcpProtocol.id}:`, error);
       });

       newSocket.on('data', (message) => 
        {
          const payload = message.toString();
          this.logger.log(`Message received from server adress ${tcpProtocol.host} and port ${tcpProtocol.port} : ${payload}`);
          const unit = "TCP unit"
          this.sendToDatabase(sensor, +payload, unit);
        });

      newSocket.on('close', () => {
          this.logger.log(`Connection to TCP server ${tcpProtocol.host} and port ${tcpProtocol.port} is closed.`);
        });
       this.clients[tcpProtocol.id] = { socket: newSocket, protocol: tcpProtocol };
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

@Cron('*/5 * * * * *') // Run every 5 seconds
sendMessageToAllServers(): void {
  //console.log("test sendMessageToAllServers()");
   for (const clientId in this.clients) {
      const { socket, protocol } = this.clients[clientId];
      if (socket) {
         socket.write(protocol.request); // Send the specified request to TCP server
         this.logger.log(`Sent request "${protocol.request}" with client id ${clientId} to server (${protocol.host}:${protocol.port})`);
      } else {
         this.logger.warn(`TCP Client with id ${clientId} not found.`);
      }
   }
}

  sendMessage(tcpProtocol: Partial<TcpProtocol>, message: string): void {
      const client = this.clients[tcpProtocol.id].socket;
      if (client) {
        client.write(message); // Send message to TCP server
        this.logger.log(`Sent message to server ${tcpProtocol.host} and port ${tcpProtocol.port}: ${message}`);
      } else {
        this.logger.warn(`TCP Client with id ${tcpProtocol.id} not found.`);
      }
    }
/*
   disconnect(mqttProtocol: MqttProtocol): void {
      const client = this.brokers[mqttProtocol.clientId];
      if (client) {
        client.end();
        delete this.brokers[mqttProtocol.clientId];
        this.logger.log(`Disconnected broker ${mqttProtocol.clientId}`);
      } else {
        this.logger.warn(`Broker with id ${mqttProtocol.clientId} not found.`);
      }
    }
  */
}
    
