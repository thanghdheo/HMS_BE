import { Test, TestingModule } from '@nestjs/testing';
import { MasterDataService } from './master_data.service';

describe('MasterDataService', () => {
  let provider: MasterDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterDataService],
    }).compile();

    provider = module.get<MasterDataService>(MasterDataService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
