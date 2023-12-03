import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.mongo.entity';

@Controller('user')
@ApiTags('User Manage')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }
}
