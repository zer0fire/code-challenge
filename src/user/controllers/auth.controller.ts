import {
  Body,
  Controller,
  Post,
  Get,
  HttpStatus,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LoginDTO } from '../dtos/login.dto';
import { TokenVO } from '../dtos/token.vo';
import { AuthService } from '../services/auth.service';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from '@/shared/dtos/base-api-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private loginService: AuthService) {}

  @ApiOperation({
    summary: 'User login',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(LoginDTO),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<TokenVO> {
    return this.loginService.login(loginDTO);
  }
}
