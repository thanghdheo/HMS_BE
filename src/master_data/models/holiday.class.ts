import { BaseDto } from 'src/common/models/base.dto';

export class Holiday extends BaseDto {
  CompanyId: number;
  Year: number;
  Month: number;
  Day: number;
}
