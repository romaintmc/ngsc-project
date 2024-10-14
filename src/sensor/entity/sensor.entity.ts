import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DataEntity } from './data.entity'

@Entity('Sensor') 
export class SensorEntity {

  @PrimaryGeneratedColumn()
  sensor_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => DataEntity, data => data.sensor)
  data: DataEntity[];  // Relation OneToMany vers DataEntity  
}
