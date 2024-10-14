// src/app.module.ts
import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { SensorModule } from './sensor/sensor.module';
import { CommunicationModule } from './communication/communication.module';
import { DataExchangeModule } from './data-exchange/data-exchange.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SensorEntity } from './sensor/entity/sensor.entity';
import { DataEntity } from './sensor/entity/data.entity';

@Module({
  imports: [
    SensorModule, 
    DataExchangeModule, 
    HttpModule, 
    CommunicationModule, 
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [SensorEntity, DataEntity], 
        cache: false,
        synchronize: false,
      }),
      inject: [ConfigService]
  }),
  TypeOrmModule.forFeature([SensorEntity, DataEntity]), // Importe les entités dans le module
],
  controllers: [],
  providers: [],
})
export class AppModule {}

