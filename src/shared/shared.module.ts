import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './configs/module-option';
import { SystemController } from './controllers/system.controller';
import { DatabaseProviders } from './database/database.provider';
import { SystemService } from './services/system.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [SystemController],
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ScheduleModule.forRoot(),
  ],
  exports: [ConfigModule, ...DatabaseProviders],
  providers: [...DatabaseProviders, SystemService],
})
export class SharedModule {}
