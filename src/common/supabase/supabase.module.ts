import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseGuard } from './supabase.guard';
import { Supabase } from './supabase';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: parseInt(process.env.EXPIRES),
      maxRedirects: 5,
    }),
  ],
  providers: [Supabase, SupabaseStrategy, SupabaseGuard, JwtService],
  exports: [Supabase, SupabaseStrategy, SupabaseGuard],
})
export class SupabaseModule {}
