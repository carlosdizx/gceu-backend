import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import UserProperties from './entities/user.properties.entity';
import CreateUserDto from './dto/create.user.dto';
import EncryptService from '../common/utils/encrypt.service';
import ErrorHandlerService from '../common/utils/error.handler.service';
const nameService = 'AuthService';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @InjectRepository(UserProperties)
    private readonly repositoryUserProperties: Repository<UserProperties>,
    private readonly encryptService: EncryptService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  public createUser = async (createUserDto: CreateUserDto) => {
    try {
      const user = this.repository.create({
        ...createUserDto,
        password: await this.encryptService.encryptPassword(
          createUserDto.password,
        ),
      });

      await this.repository.save(user);

      const userProperties: UserProperties =
        this.repositoryUserProperties.create({
          ...createUserDto,
          user,
        });

      await this.repositoryUserProperties.save(userProperties);
      user.properties = userProperties;

      await this.repository.save(user);

      delete user.password;
      delete userProperties.user;
      return user;
    } catch (error) {
      this.errorHandlerService.handleException(error, nameService);
    }
  };

  public findUserById = async (id: string) => {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  };

  public deleteUserById = async (id: string) => {
    const result = await this.repository.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: `User was removed` };
  };
}
