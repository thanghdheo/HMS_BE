import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './common/supabase';
import { MasterDataModule } from './master_data/master_data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    SupabaseModule,
    MasterDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
