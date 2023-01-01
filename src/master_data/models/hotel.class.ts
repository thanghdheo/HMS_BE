import { BaseDto } from '../../common/models/base.dto';

export class Hotel extends BaseDto {
  CompanyId: number;
  Code: string;
  Name: string;
  Address: string;
  Phone: string;
}
