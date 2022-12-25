import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Supabase } from 'src/common/supabase';
import { RoomActivities } from '../models/room_activities.class';
import * as _ from 'lodash';
import { StatusCode } from 'src/master_data/models/status_code.enum';
import { MasterDataService } from 'src/master_data/services/master_data.service';

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
      .select()
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
}
