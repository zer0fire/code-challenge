import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './configs/module-option';
import { SystemController } from './controllers/system.controller';
import { DatabaseProviders } from './database/database.provider';
import { SystemService } from './services/system.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SentryModule } from '@ntegral/nestjs-sentry';

@Module({
  controllers: [SystemController],
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ScheduleModule.forRoot(),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dsn: configService.get<string>('sentry.url'),
        debug: true,
        environment: 'dev',
        logLevels: ['debug'],
      }),
    }),
  ],
  exports: [ConfigModule, ...DatabaseProviders],
  providers: [...DatabaseProviders, SystemService],
})
export class SharedModule {}
