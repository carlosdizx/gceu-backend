import { Injectable } from '@nestjs/common';
import CreateEnterpriseDto from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { Repository } from 'typeorm';
import ErrorHandlerService from '../common/utils/error.handler.service';
const nameService = 'EnterpriseService';
@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly repository: Repository<Enterprise>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  public create = async (createEnterpriseDto: CreateEnterpriseDto) => {
    try {
      const enterprise = this.repository.create({
        ...createEnterpriseDto,
      });

      await this.repository.save(enterprise);

      return enterprise;
    } catch (error) {
      this.errorHandlerService.handleException(error, nameService);
    }
    return 'This action adds a new enterprise';
  };
}
