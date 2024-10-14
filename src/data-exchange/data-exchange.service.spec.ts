import { Test, TestingModule } from '@nestjs/testing';
import { DataExchangeService } from './data-exchange.service';

describe('DataExchangeService', () => {
  let service: DataExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataExchangeService],
    }).compile();

    service = module.get<DataExchangeService>(DataExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
