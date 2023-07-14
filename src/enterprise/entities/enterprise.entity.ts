import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../auth/entities/user.entity';
import { StatusEnterprise } from '../enums/status.enterprise.enum';

@Entity('enterprises')
export class Enterprise {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  documentNumber: string;

  @Column('varchar')
  documentType: string;

  @Column('varchar')
  cellphone: string;

  @OneToOne(() => User, (user) => user.ownerEnterprise)
  @JoinColumn()
  owner: User;

  @Column('enum', {
    enum: StatusEnterprise,
    default: StatusEnterprise.PENDING_ACCOUNT_CREATION,
  })
  status: StatusEnterprise;
}
