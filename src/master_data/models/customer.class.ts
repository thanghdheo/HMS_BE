import { BaseDto } from '../../common/models/base.dto';

export class Customer extends BaseDto {
  CMND: string;
  Name: string;
  Phone: string;
  Description: string;
}
