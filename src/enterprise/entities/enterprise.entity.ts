import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../auth/entities/user.entity';
import { StatusEnterprise } from '../enums/status.enterprise.enum';
import { DocumentTypes } from '../../common/enums/document-types.enum';

@Entity('enterprises')
export class Enterprise {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  documentNumber: string;

  @Column('enum', {
    enum: DocumentTypes,
  })
  documentType: DocumentTypes;

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
