import { MqttBrokerService } from 'src/data-exchange/mqtt-broker/mqtt-broker.service';
import { TcpService } from 'src/data-exchange/tcp/tcp.service';
import { Sensor } from 'src/sensor/sensor.interface';
export declare class DataExchangeService {
    private readonly mqttBrokerService;
    private readonly tcpService;
    constructor(mqttBrokerService: MqttBrokerService, tcpService: TcpService);
    private sensors;
    addSensor(protocol: string, sensor: Sensor): string;
    getConfig<T>(path: string): Partial<T>;
}
