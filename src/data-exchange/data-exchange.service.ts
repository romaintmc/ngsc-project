import { MqttBrokerService } from 'src/data-exchange/mqtt-broker/mqtt-broker.service';
import { TcpService } from 'src/data-exchange/tcp/tcp.service';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Sensor, MqttProtocol, TcpProtocol, Protocol} from 'src/sensor/sensor.interface';

@Injectable()
export class DataExchangeService {

  constructor(private readonly mqttBrokerService: MqttBrokerService,
              private readonly tcpService : TcpService
  ) {}
  private sensors: {[id: string] : {sensor : Sensor, protocol : string}} = {};
  //private sensors: Sensor[] = [];
  addSensor(protocol: string, sensor : Sensor)
  {
      if(protocol == "mqtt"){
        if(this.sensors[sensor.sensor_id]){
          return "Sensor already added"
        }
        else{
          const config = this.getConfig<MqttProtocol>("src/data-exchange/mqtt-config.json");
          this.mqttBrokerService.addBroker(config,sensor);
          this.sensors[sensor.sensor_id]={sensor : sensor , protocol : protocol};
        }
      }
      if(protocol == "tcp"){
        if(this.sensors[sensor.sensor_id]){
          return "Sensor already added"
        }
        else{
          const config = this.getConfig<TcpProtocol>("src/data-exchange/tcp-config.json");
          this.tcpService.connect(config,sensor);
          this.tcpService.sendMessage(config,config.request); // config.request to be changed with the right request
          this.sensors[sensor.sensor_id]={sensor : sensor , protocol : protocol};
        }

     }
      /*
      ADD OTHER PROTOCOLS
      */
  }

  getConfig<T>(path: string): Partial<T> { // <T> makes it generic for every protocol implemented
   try {
     
     const fileContent = fs.readFileSync(path, 'utf8');
     const config: Partial<T> = JSON.parse(fileContent);
     return config;
   } catch (err) {
     console.error('Error reading config file:', err);
     return {};
   }
 }
}