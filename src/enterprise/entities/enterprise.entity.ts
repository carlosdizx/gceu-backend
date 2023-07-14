import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../auth/entities/user.entity';

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

  @OneToOne(() => User, (user) => user.ownerEnterprise)
  @JoinColumn()
  owner: User;
}
