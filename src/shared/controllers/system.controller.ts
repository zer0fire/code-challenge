import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemService } from '../services/system.service';

@ApiTags('System maintenance')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}
}
