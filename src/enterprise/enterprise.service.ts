import { Injectable } from '@nestjs/common';
import CreateEnterpriseDto from './dto/create-enterprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { DataSource, Repository } from 'typeorm';
import ErrorHandlerService from '../common/utils/error.handler.service';
import AuthService from '../auth/auth.service';
import User from '../auth/entities/user.entity';
import UserService from '../auth/user.service';
const nameService = 'EnterpriseService';
@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly repository: Repository<Enterprise>,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly errorHandlerService: ErrorHandlerService,
    private datasource: DataSource,
  ) {}

  public create = async (createEnterpriseDto: CreateEnterpriseDto) => {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await this.authService.registerUser(createEnterpriseDto.user);
    const owner = await this.userService.findUserById(user.id);
    try {
      const enterprise = this.repository.create({
        ...createEnterpriseDto,
        owner,
      });

      await queryRunner.manager.save(enterprise);

      await queryRunner.commitTransaction();

      return enterprise;
    } catch (error) {
      this.errorHandlerService.handleException(error, nameService);
    }
  };
}
