import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Supabase } from '../../common/supabase';
import { RoomActivities } from '../model/room_activities.class';
import * as _ from 'lodash';
import { StatusCode } from '../../master_data/models/status_code.enum';
import { MasterDataService } from '../../master_data/services/master_data.service';
import { DayTypeCode } from '../../master_data/models/day_type.enum';
import { PriceTypeCode } from '../../master_data/models/price_type.enum';
import { RoomTypeCode } from '../../master_data/models/room_type.enum';

@Injectable()
export class WorkflowService {
  constructor(
    private readonly supabase: Supabase,
    private readonly masterDataService: MasterDataService,
  ) {}

  async booking(roomActivities: RoomActivities): Promise<any> {
    var room = await this.masterDataService.getRoomById(roomActivities.RoomId);
    var timeNow = new Date(new Date().toUTCString());
    var statusCode = StatusCode.BUSY;
    if (roomActivities.TimeIn > timeNow) statusCode = StatusCode.BOOKED;
    var status = await this.masterDataService.getStatusByCode(statusCode);

    const { data, error } = await (await this.supabase.getClient())
      .from('RoomActivities')
      .insert(roomActivities)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    room.StatusId = status.Id;
    room.RoomActivityId = _.first(data).Id;
    await this.masterDataService.updateRoom(room);

    return data;
  }

  async checkOut(roomActivities: RoomActivities): Promise<any> {
    var id = roomActivities.Id ? roomActivities.Id : 0;
    delete roomActivities.Id;
    const { data, error } = await (await this.supabase.getClient())
      .from('RoomActivities')
      .select()
      .eq('Id', id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Room Activities not found');
    }

    var room = await this.masterDataService.getRoomById(roomActivities.RoomId);
    var status = await this.masterDataService.getStatusByCode(
      StatusCode.CLEANING,
    );
    room.StatusId = status.Id;
    room.RoomActivityId = roomActivities.Id;
    await this.masterDataService.updateRoom(room);

    const { data: data2, error: error2 } = await (
      await this.supabase.getClient()
    )
      .from('RoomActivities')
      .update(roomActivities)
      .match({ Id: id })
      .select();
    if (error2) {
      throw new InternalServerErrorException(error2.message);
    }
    return data2;
  }

  async getRoomActivitiesById(id: number): Promise<RoomActivities> {
    const { data, error } = await (await this.supabase.getClient())
      .from('RoomActivities')
      .select(
        '*, Room: RoomId (*, RoomType: TypeId(*)), PriceType: PriceTypeId (*)',
      )
      .eq('Id', id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Room Activities not found');
    }
    return _.first(data);
  }

  async cancel(id: number): Promise<any> {
    var roomActivities = await this.getRoomActivitiesById(id);
    var room = await this.masterDataService.getRoomById(roomActivities.RoomId);
    var status = await this.masterDataService.getStatusByCode(
      StatusCode.AVAILABLE,
    );
    room.StatusId = status.Id;
    room.RoomActivityId = null;
    await this.masterDataService.updateRoom(room);

    const { data, error } = await (await this.supabase.getClient())
      .from('RoomActivities')
      .update({ TimeOut: new Date() })
      .eq('Id', id)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return _.isEmpty(data) ? 'fail' : 'success';
  }

  async calculatePrice(
    roomActivities: RoomActivities,
    companyId: number,
  ): Promise<number> {
    var priceResult = 0;
    const { data, error } = await (await this.supabase.getClient())
      .from('RoomActivities')
      .select(
        '*, Room: RoomId (*, RoomType: TypeId(*)), PriceType: PriceTypeId (*)',
      )
      .eq('Id', roomActivities.Id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Room Activities not found');
    }
    let diffTime = Math.abs(
      new Date(roomActivities.TimeOut).valueOf() -
        new Date(roomActivities.TimeIn).valueOf(),
    );
    let days = diffTime / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;

    var priceTypeId = roomActivities.PriceTypeId;
    var priceTypes = await this.masterDataService.getAllPriceType();
    var priceType = priceTypes.find((x) => x.Id == priceTypeId);
    if (priceType.Code == PriceTypeCode.HOUR) {
      var delta = Math.round(hours);
      var priceTypeHour = priceTypes.find(
        (x) => x.Value == (delta >= 4 ? 4 : delta),
      );
      priceTypeId = priceTypeHour.Id;
    }
    var currentDate = new Date();
    var holiday = await this.masterDataService.getHolidayByDate(currentDate);
    var price = await this.masterDataService.getPriceByPriceTypeId(
      priceTypeId,
      companyId,
      holiday ? DayTypeCode.HOLIDAY : DayTypeCode.NORMAL,
    );
    var roomActivitiesResult = _.first(data) as RoomActivities;
    if (roomActivitiesResult.Room.RoomType.Code == RoomTypeCode.STANDARD) {
      if (roomActivitiesResult.Room.Beds == 1) {
        priceResult = price.Normal1Beg;
      } else if (roomActivitiesResult.Room.Beds == 2) {
        priceResult = price.Normal2Beg;
      } else if (roomActivitiesResult.Room.Beds == 3) {
        priceResult = price.Normal3Beg;
      }
    } else {
      if (roomActivitiesResult.Room.Beds == 1) {
        priceResult = price.VIP1Beg;
      } else if (roomActivitiesResult.Room.Beds == 2) {
        priceResult = price.VIP2Beg;
      } else if (roomActivitiesResult.Room.Beds == 3) {
        priceResult = price.VIP3Beg;
      }
    }
    return (
      priceResult *
      (priceType.Code == PriceTypeCode.HOUR ? 1 : Math.floor(days) + 1)
    );
  }

  async updateRoomActivities(roomActivities: RoomActivities): Promise<any> {
    var id = roomActivities.Id ? roomActivities.Id : 0;
    delete roomActivities.Id;
    delete roomActivities.PriceType;
    delete roomActivities.Room;
    const { data, error } = await (await this.supabase.getClient())
      .from('RoomActivities')
      .select()
      .eq('Id', id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Room Activities not found');
    }

    const { data: data2, error: error2 } = await (
      await this.supabase.getClient()
    )
      .from('RoomActivities')
      .update(roomActivities)
      .match({ Id: id })
      .select();
    if (error2) {
      throw new InternalServerErrorException(error2.message);
    }
    return data2;
  }

  async checkIn(id: number): Promise<any> {
    var roomActivities = await this.getRoomActivitiesById(id);
    var room = await this.masterDataService.getRoomById(roomActivities.RoomId);
    var status = await this.masterDataService.getStatusByCode(StatusCode.BUSY);
    room.StatusId = status.Id;
    room.RoomActivityId = null;
    await this.masterDataService.updateRoom(room);
    return 'success';
  }

  async finishedCleaning(id: number): Promise<any> {
    var roomActivities = await this.getRoomActivitiesById(id);
    var room = await this.masterDataService.getRoomById(roomActivities.RoomId);
    var status = await this.masterDataService.getStatusByCode(
      StatusCode.AVAILABLE,
    );
    room.StatusId = status.Id;
    room.RoomActivityId = null;
    await this.masterDataService.updateRoom(room);
    return 'success';
  }
}
