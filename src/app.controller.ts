import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './user/services/auth.service';
import { ApiOperation } from '@nestjs/swagger';

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
}
