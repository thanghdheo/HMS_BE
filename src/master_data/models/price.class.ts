import { BaseDto } from 'src/common/models/base.dto';

export class Price extends BaseDto {
  CompanyId: number;
  PriceTypeId: number;
  DayType: string;
  Normal1Beg: number;
  Normal2Beg: number;
  Normal3Beg: number;
  VIP1Beg: number;
  VIP2Beg: number;
  VIP3Beg: number;
}
