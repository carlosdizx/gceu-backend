import { Injectable } from '@nestjs/common';
import CreateEnterpriseDto from './dto/create-enterprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { DataSource, Repository } from 'typeorm';
import ErrorHandlerService from '../common/utils/error.handler.service';
import AuthService from '../auth/auth.service';
import UserService from '../auth/user.service';
import { EnterpriseCrudService } from './enterprise.crud.service';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly repository: Repository<Enterprise>,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly datasource: DataSource,
    private readonly enterpriseCrudService: EnterpriseCrudService,
  ) {}

  public registerEnterprise = async (
    createEnterpriseDto: CreateEnterpriseDto,
  ) => {
    return await this.enterpriseCrudService.create(createEnterpriseDto);
  };
}
