import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';

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

  @Column('varchar')
  typeDocument: string;

  @Column('varchar')
  cellphone: string;

  @OneToOne(() => User, (user) => user.properties)
  @JoinColumn()
  user: User;
}
