import { Sensor, MqttProtocol } from 'src/sensor/sensor.interface';
import { Repository } from 'typeorm';
import { DataEntity } from "src/sensor/entity/data.entity";
import { SensorEntity } from "src/sensor/entity/sensor.entity";
export declare class MqttBrokerService {
    private readonly dataRepository;
    private readonly sensorRepository;
    private brokers;
    constructor(dataRepository: Repository<DataEntity>, sensorRepository: Repository<SensorEntity>);
    private readonly logger;
    addBroker(mqttProtocol: Partial<MqttProtocol>, sensor: Sensor): void;
    subscribeToTopic(mqttProtocol: Partial<MqttProtocol>, sensor: Sensor): void;
    sendToDatabase(sensor: Sensor, payload: number, unit: string): Promise<void>;
    deleteBroker(mqttProtocol: Partial<MqttProtocol>): void;
}
