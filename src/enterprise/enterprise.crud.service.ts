import { Injectable } from '@nestjs/common';
import CreateEnterpriseDto from './dto/create-enterprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { DataSource, Repository } from 'typeorm';
import ErrorHandlerService from '../common/utils/error.handler.service';
import AuthService from '../auth/auth.service';
import UserService from '../auth/user.service';
import { Roles } from '../auth/enums/role.enum';

const nameService = 'EnterpriseCrudService';
@Injectable()
export class EnterpriseCrudService {
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
    const { user } = await this.authService.registerUser(
      {
        ...createEnterpriseDto.user,
      },
      [Roles.ADMIN],
    );
    try {
      const enterprise = this.repository.create({
        ...createEnterpriseDto,
        owner: user,
      });
      user.ownerEnterprise = await queryRunner.manager.save(enterprise);
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      return enterprise;
    } catch (error) {
      await this.userService.deleteUserById(user.id);
      this.errorHandlerService.handleException(error, nameService);
    }
  };
}
