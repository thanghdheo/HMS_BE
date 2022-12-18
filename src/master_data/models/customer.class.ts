import { BaseDto } from 'src/common/models/base.dto';

export class Customer extends BaseDto {
  CMND: string;
  Name: string;
  Phone: string;
  Description: string;
}
