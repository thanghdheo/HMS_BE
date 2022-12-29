import { BaseDto } from 'src/common/models/base.dto';
import { RoomActivities } from 'src/workflow/models/room_activities.class';
import { Hotel } from './hotel.class';
import { RoomType } from './room_type.class';
import { Status } from './status.class';

export class Room extends BaseDto {
  CompanyId: number;
  HotelId: number;
  Code: string;
  Name: string;
  TypeId: number;
  Floor: number;
  StatusId: number;
  Beds: number;
  RoomActivityId?: number;
  RoomType?: RoomType;
  Hotel?: Hotel;
  Status?: Status;
  RoomActivities?: RoomActivities;
}
