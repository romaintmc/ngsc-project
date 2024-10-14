import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { CommunicationService } from './communication.service';

@Controller('communication')
export class CommunicationController {
  constructor(private readonly CommunicationService: CommunicationService) {}

  @Get()
  async getDataFromPi2(): Promise<any> {
    return this.CommunicationService.getDataFromPi2();
  }
}