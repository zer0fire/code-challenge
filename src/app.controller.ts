import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './user/services/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Initialize')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly authService: AuthService,
    private readonly authService: AuthService, // private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'initial data',
  })
  @Post('init')
  async init() {
    return await this.authService.init();
  }

  @Get('/')
  async getHello() {
    return await this.appService.getHello();
  }
}
