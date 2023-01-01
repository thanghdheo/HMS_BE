import { PriceType } from '../../master_data/models/price_type.class';
import { Room } from '../../master_data/models/room.class';

export class RoomActivities {
  Id: number;
  RoomId: number;
  CustomerId: string;
  TimeIn: Date;
  TimeOut: Date;
  PriceTypeId: number;
  TimePrice: number;
  SubFee: number;
  TotalPrice: number;
  Description: string;
  Deposit: number;
  Room: Room;
  PriceType: PriceType;
}
