import { PartialType } from '@nestjs/mapped-types';
import LoginUserDto from './login.user.dto';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { DocumentTypes } from '../enums/document-types.enum';

export default class CreateUserDto extends PartialType(LoginUserDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  document: string;

  @IsIn(Object.values(DocumentTypes))
  typeDocument: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(20)
  cellphone: string;
}
