import { IsEmail } from 'class-validator';
import { BaseDto } from 'src/common/models/base.dto';
export class User extends BaseDto {
  UserName: string;
  FullName: string;
  @IsEmail()
  Email: string;
  Phone: string;
  Address: string;
  Description: string;
  CompanyId: number;
  UserId: string;
}
