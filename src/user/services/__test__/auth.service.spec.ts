import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { encryptPassword } from '@/shared/utils/crypto.util';
import { JwtService } from '@nestjs/jwt';
import { SharedModule } from '@/shared/shared.module';
import { UserModule } from '@/user/user.module';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, UserModule],
      providers: [AuthService, UserService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('Auth Service should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Auth Service getAttemptTimes', async () => {
    const time = await service.getAttemptTimes('admin');
    expect(time).toEqual(0);
  });
  it('Auth Service getPassword', () => {
    const { salt, hashPassword } = service.getPassword('abc886');
    expect(hashPassword).toEqual(encryptPassword('abc886', salt));
  });
  it('Auth Service certificate', async () => {
    const user = await userService.findOneByUsername('admin');
    const token = await service.certificate(user);
    expect(token).toEqual(
      jwtService.sign({
        id: user._id,
      }),
    );
  });
});
