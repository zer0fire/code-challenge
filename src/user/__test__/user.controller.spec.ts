import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { SharedModule } from '@/shared/shared.module';
import { UserModule } from '../user.module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, UserModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
