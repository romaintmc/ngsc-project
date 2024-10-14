import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Sensor') 
export class SensorEntity {
  value(type: string, value: any) {
      throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  sensor_id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  unit: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
    id: any;
}
