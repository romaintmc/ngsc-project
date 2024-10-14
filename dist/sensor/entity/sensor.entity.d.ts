import { DataEntity } from './data.entity';
export declare class SensorEntity {
    sensor_id: number;
    name: string;
    type: string;
    location: string;
    created_at: Date;
    data: DataEntity[];
}
