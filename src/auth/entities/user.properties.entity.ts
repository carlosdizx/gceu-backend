import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';
import { DocumentTypes } from '../../common/enums/document-types.enum';

@Entity('user_properties')
export default class UserProperties {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  document: string;

  @Column('enum', {
    enum: DocumentTypes,
  })
  documentType: DocumentTypes;

  @Column('varchar')
  cellphone: string;

  @OneToOne(() => User, (user) => user.properties)
  @JoinColumn()
  user: User;
}
