import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO } from '../dtos/login.dto';
import { encryptPassword, makeSalt } from '@/shared/utils/crypto.util';
import { TokenVO } from '../dtos/token.vo';
import { User } from '../entities/user.mongo.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { MongoRepository } from 'typeorm';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { UserDto } from '../dtos/auto.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  clear() {
    this.userRepository.deleteMany({});
    return { ok: 1 };
  }

  getPassword(password) {
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt); // 加密密码
    return { salt, hashPassword };
  }

  /**
   * 校验注册信息
   * @param userDto
   */
  async checkRegisterForm(userDto: UserDto): Promise<any> {
    const { username } = userDto;
    const hasUser = await this.userRepository.findOneBy({ username });
    if (hasUser) {
      throw new NotFoundException('Already exist');
    }
  }

  /**
   * 注册
   * @param userDto
   * @returns
   */
  async register(userDto: UserDto): Promise<any> {
    await this.checkRegisterForm(userDto);

    const { username, password } = userDto;
    // const salt = makeSalt(); // 制作密码盐
    // const hashPassword = encryptPassword(password, salt);  // 加密密码

    const { salt, hashPassword } = this.getPassword(password);

    const newUser: User = new User();
    newUser.username = username;
    newUser.password = hashPassword;
    newUser.salt = salt;
    newUser.isAccountDisabled = false;
    const data = await this.userRepository.save(newUser);
    delete data.password;
    delete data.salt;
    return {
      data,
    };
  }

  async init() {
    // clear all data
    this.clear();

    await this.register({
      username: 'admin',
      password: 'abc886',
    });
  }

  /**
   * Check the login information
   * @param loginDTO
   * @returns
   */
  async checkLoginForm(loginDTO: LoginDTO): Promise<any> {
    const { username, password } = loginDTO;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`User doesn't exist`);
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('Password Error');
    }

    return user;
  }

  async certificate(user: User) {
    const payload = {
      id: user._id,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDTO: LoginDTO): Promise<TokenVO> {
    const user = await this.checkLoginForm(loginDTO);
    const token = await this.certificate(user);
    return {
      data: {
        token,
      },
    };
  }
}
