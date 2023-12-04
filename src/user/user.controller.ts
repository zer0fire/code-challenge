import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './services/user.service';
import { ApiTags } from '@nestjs/swagger';

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
