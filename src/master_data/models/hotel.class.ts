import { BaseDto } from 'src/common/models/base.dto';

export class Hotel extends BaseDto {
  Code: string;
  Name: string;
  Address: string;
  Phone: string;
}
