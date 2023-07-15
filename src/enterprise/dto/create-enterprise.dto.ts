import {
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { DocumentTypes } from '../../common/enums/document-types.enum';
import CreateUserDto from '../../auth/dto/create.user.dto';
import { Type } from 'class-transformer';

export default class CreateEnterpriseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(70)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  documentNumber: string;

  @IsIn(Object.values(DocumentTypes))
  documentType: DocumentTypes;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(20)
  cellphone: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
