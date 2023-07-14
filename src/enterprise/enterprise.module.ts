import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enterprise]), AuthModule],
  controllers: [EnterpriseController],
  providers: [EnterpriseService],
})
export class EnterpriseModule {}
