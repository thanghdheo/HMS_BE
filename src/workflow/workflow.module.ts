import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/common/supabase';
import { MasterDataService } from 'src/master_data/services/master_data.service';
import { WorkflowController } from './controllers/workflow.controller';
import { WorkflowService } from './services/workflow.service';

@Module({
  imports: [SupabaseModule],
  controllers: [WorkflowController],
  providers: [WorkflowService, MasterDataService],
})
export class WorkflowModule {}
