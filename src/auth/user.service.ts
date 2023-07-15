import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import UserProperties from './entities/user.properties.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @InjectRepository(UserProperties)
    private readonly repositoryUserProperties: Repository<UserProperties>,
  ) {}

  public findUserById = async (id: string) => {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  };
}
