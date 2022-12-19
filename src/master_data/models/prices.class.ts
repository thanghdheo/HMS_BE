import { BaseDto } from "src/common/models/base.dto";
import { PriceDetails } from "./price_detail.class";

export class Prices extends BaseDto {
  RoomTypeId: number;
  PriceTypeId: number;
  Price: number;
  DayType: string;
  FromDate: Date;
  ToDate: Date;
  Details?: PriceDetails[];
}
