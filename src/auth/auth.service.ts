import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create.user.dto';
import ErrorHandlerService from '../common/utils/error.handler.service';
import EncryptService from '../common/utils/encrypt.service';
import LoginUserDto from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import JwtPayload from './interfaces/jwt-payload.interface';
import UserProperties from './entities/user.properties.entity';
import UserService from './user.service';

const nameService = 'AuthService';
@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @InjectRepository(UserProperties)
    private readonly repositoryUserProperties: Repository<UserProperties>,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public registerUser = async (createUserDto: CreateUserDto) => {
    const user = await this.userService.createUser(createUserDto);
    try {
      delete user.password;
      return {
        user,
        token: this.generateJWT({ id: user.id }),
      };
    } catch (error) {
      this.errorHandlerService.handleException(error, nameService);
    }
  };

  public loginUser = async ({ email, password }: LoginUserDto) => {
    const user = await this.repository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');
    if (!(await this.encryptService.validatePassword(password, user.password)))
      throw new UnauthorizedException('Credentials are not valid (password)');
    delete user.password;
    return { ...user, token: this.generateJWT({ id: user.id }) };
  };

  private generateJWT = (payload: JwtPayload) => {
    return this.jwtService.sign(payload);
  };
}
