import { Test, TestingModule } from '@nestjs/testing';
import { MqttBrokerService } from './mqtt-broker.service';

describe('MqttBrokerService', () => {
  let service: MqttBrokerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqttBrokerService],
    }).compile();

    service = module.get<MqttBrokerService>(MqttBrokerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
