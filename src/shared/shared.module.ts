import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './configs/module-option';
import { SystemController } from './controllers/system.controller';
import { DatabaseProviders } from './database/database.provider';
import { SystemService } from './services/system.service';

@Module({
  controllers: [SystemController],
  imports: [ConfigModule.forRoot(configModuleOptions)],
  exports: [ConfigModule, ...DatabaseProviders],
  providers: [...DatabaseProviders, SystemService],
})
export class SharedModule {}
