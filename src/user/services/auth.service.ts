import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO } from '../dtos/login.dto';
import { encryptPassword, makeSalt } from '@/shared/utils/crypto.util';
import { TokenVO } from '../dtos/token.vo';
import { User } from '../entities/user.mongo.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { MongoRepository } from 'typeorm';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { RegisterUserDto } from '../dtos/auto.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  clear() {
    this.userRepository.deleteMany({});
    return { ok: 1 };
  }

  getPassword(password) {
    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);
    return { salt, hashPassword };
  }

  /**
   * Validate login info
   * @param userDto
   */
  async checkRegisterForm(userDto: RegisterUserDto): Promise<any> {
    const { username } = userDto;
    const hasUser = await this.userRepository.findOneBy({ username });
    if (hasUser) {
      throw new NotFoundException('Already exist');
    }
  }

  /**
   * Normal register
   * @param userDto
   * @returns
   */
  async register(userDto: RegisterUserDto): Promise<any> {
    await this.checkRegisterForm(userDto);

    const { username, password } = userDto;
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
    // get attempt times
    const times = await this.getAttemptTimes(user);
    if (user.isAccountDisabled || times >= 3) {
      // maybe need limit
      if (times) {
        // update isAccountDisabled
        this.userService.update(user._id, {
          ...user,
          isAccountDisabled: true,
        });
      }
      throw new NotFoundException(`User has been blocked`);
    }
    //
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      // set attempt times
      this.setAttemptTimes(user);
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

  async getAttemptTimes(user: User) {
    const res = await this.redis.get(user.username);
    if (res) {
      return Number(res);
    } else {
      return 0;
    }
  }

  async setAttemptTimes(user: User) {
    let times = await this.getAttemptTimes(user);
    this.redis.set(user.username, ++times, 'EX', 300);
  }
}
