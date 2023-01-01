import { Module } from '@nestjs/common';
import { SupabaseModule } from '../common/supabase';
import { Utility } from '../common/utility';
import { MasterDataController } from './controllers/master_data.controller';
import { MasterDataService } from './services/master_data.service';

@Module({
  imports: [SupabaseModule],
  providers: [MasterDataService, Utility],
  controllers: [MasterDataController],
})
export class MasterDataModule {}
