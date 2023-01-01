import { Module } from '@nestjs/common';
import { SupabaseModule } from '../common/supabase';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [SupabaseModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
