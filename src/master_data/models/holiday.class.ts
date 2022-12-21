import { BaseDto } from 'src/common/models/base.dto';

export class Holiday extends BaseDto {
  CompanyId: number;
  Year: string;
  Month: string;
  Day: string;
}
