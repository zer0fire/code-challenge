import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { User } from '../entities/user.mongo.entity';
import { encryptPassword, makeSalt } from '@/shared/utils/crypto.util';
import { CreateUserDto } from '../dtos/auto.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}
  create(user: User) {
    return JSON.stringify(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: ObjectId, user: CreateUserDto) {
    // remove date and _id
    ['_id', 'createdAt', 'updatedAt'].forEach((k) =>
      Reflect.deleteProperty(user, k),
    );
    console.log(id, 'user', user);
    /// update password
    if (user.password) {
      const { salt, hashPassword } = this.getPassword(user.password);
      user.salt = salt;
      user.password = hashPassword;
    }

    return await this.userRepository.update(id, user);
  }

  getPassword(password) {
    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);
    return { salt, hashPassword };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
