import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SensorEntity } from './sensor.entity';

@Entity('Data')
export class DataEntity {
  
  @PrimaryGeneratedColumn()
  data_id: number;

  @Column()
  value: number;

  @Column()
  unit: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
    id: any;
  // Relation avec SensorEntity
  @ManyToOne(() => SensorEntity, sensor => sensor.data)
  @JoinColumn({ name: 'sensor_id' })
  sensor: SensorEntity;
}
