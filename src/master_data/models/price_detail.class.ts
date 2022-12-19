import { BaseDto } from "src/common/models/base.dto";

export class PriceDetails extends BaseDto {
  FromHour: number;
  ToHour: number;
  Price: number;
}
