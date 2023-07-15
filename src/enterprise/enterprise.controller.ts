import { Body, Controller, Post } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import CreateEnterpriseDto from './dto/create-enterprise.dto';
import Auth from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/enums/role.enum';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  @Auth(Roles.SUPERUSER)
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.registerEnterprise(createEnterpriseDto);
  }
}
