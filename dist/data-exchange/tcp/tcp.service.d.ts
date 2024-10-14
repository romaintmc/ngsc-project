import { Sensor, TcpProtocol } from 'src/sensor/sensor.interface';
import { Repository } from 'typeorm';
import { DataEntity } from "src/sensor/entity/data.entity";
import { SensorEntity } from "src/sensor/entity/sensor.entity";
export declare class TcpService {
    private readonly dataRepository;
    private readonly sensorRepository;
    private clients;
    private readonly logger;
    constructor(dataRepository: Repository<DataEntity>, sensorRepository: Repository<SensorEntity>);
    connect(tcpProtocol: Partial<TcpProtocol>, sensor: Sensor): void;
    sendToDatabase(sensor: Sensor, payload: number, unit: string): Promise<void>;
    sendMessageToAllServers(): void;
    sendMessage(tcpProtocol: Partial<TcpProtocol>, message: string): void;
}
