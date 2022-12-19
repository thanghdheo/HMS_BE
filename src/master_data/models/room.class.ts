import { BaseDto } from 'src/common/models/base.dto';

export class Room extends BaseDto {
  CompanyId: number;
  HotelId: number;
  Code: string;
  Name: string;
  TypeId: number;
  Floor: number;
  StatusId: number;
  Beds: number;
}
