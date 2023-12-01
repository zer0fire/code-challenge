import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserModule } from '@/user/user.module';
import { SharedModule } from '@/shared/shared.module';
import { encryptPassword } from '@/shared/utils/crypto.util';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, UserModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('User Service findAll', async () => {
    const userList = await service.findAll();
    console.log(userList);
    expect(userList[0].length).toEqual(1);
    expect(userList[1]).toEqual(1);
  });
  it('User Service findOneByUsername', async () => {
    const user = await service.findOneByUsername({ username: 'admin' });
    expect(user).toBeDefined();
  });
  it('User Service getPassword', () => {
    const { salt, hashPassword } = service.getPassword('abc886');
    expect(hashPassword).toEqual(encryptPassword('abc886', salt));
  });
});
