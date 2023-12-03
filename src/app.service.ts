import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from './user/services/auth.service';
import { User } from './user/entities/user.mongo.entity';
import { MongoRepository } from 'typeorm';
import { UserService } from './user/services/user.service';

@Injectable()
export class AppService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
