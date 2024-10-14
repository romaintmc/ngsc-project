import { Test, TestingModule } from '@nestjs/testing';
import { DataExchangeController } from './data-exchange.controller';

describe('DataExchangeController', () => {
  let controller: DataExchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataExchangeController],
    }).compile();

    controller = module.get<DataExchangeController>(DataExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
