import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/common/supabase';
import { WorkflowController } from './controllers/workflow.controller';
import { WorkflowService } from './services/workflow.service';

@Module({
  imports: [SupabaseModule],
  controllers: [WorkflowController],
  providers: [WorkflowService],
})
export class WorkflowModule {}
