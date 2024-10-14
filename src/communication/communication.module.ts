import { Module } from '@nestjs/common';
import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';
import { DataExchangeModule } from 'src/data-exchange/data-exchange.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, DataExchangeModule],
  controllers: [CommunicationController],
  providers: [CommunicationService]
})

export class CommunicationModule {}
