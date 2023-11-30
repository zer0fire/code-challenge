import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { RedisModule } from '@nestjs-modules/ioredis';
import { SharedModule } from '@/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { UserProviders } from './user.provider';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    SharedModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => configService.get('jwt'),
    }),
    RedisModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: configService.get('redis'),
      }),
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [...UserProviders, UserService, AuthService],
  exports: [UserService, AuthService, ...UserProviders],
})
export class UserModule {}
