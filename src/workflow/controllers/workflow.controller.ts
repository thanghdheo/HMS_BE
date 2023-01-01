import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Supabase } from '../../common/supabase';
import { RoomActivities } from '../models/room_activities.class';
import { WorkflowService } from '../services/workflow.service';

@Controller('workflow')
export class WorkflowController {
  private readonly logger = new Logger(WorkflowController.name);
  constructor(
    private readonly workflowService: WorkflowService,
    private readonly supabase: Supabase,
  ) {}

  @Post('booking')
  createRoomActivities(@Body() roomActivities: RoomActivities): any {
    this.logger.log('Booking');
    return this.workflowService.booking(roomActivities);
  }

  @Post('checkOut')
  checkOut(@Body() roomActivities: RoomActivities): any {
    this.logger.log('CheckOut');
    return this.workflowService.checkOut(roomActivities);
  }

  @Get('getBookingById/:id')
  getRoomActivitiesById(@Param('id') id: string): any {
    this.logger.log('get Room Activities By Id');
    const RoomActivitiesId = parseInt(id);
    return this.workflowService.getRoomActivitiesById(RoomActivitiesId);
  }

  @Post('cancelBooking')
  deleteRoomActivitiesById(@Body() data): any {
    this.logger.log('delete Room Activities By Ids');
    return this.workflowService.cancel(data.Id);
  }

  @Post('calculatePrice')
  async calculatePrice(@Body() roomActivities: RoomActivities): Promise<any> {
    this.logger.log('calculate Price');
    var companyId = await (await this.supabase.getCurrentUser()).CompanyId;
    return this.workflowService.calculatePrice(roomActivities, companyId);
  }

  @Post('updateRoomActivities')
  updateRoomActivities(@Body() roomActivities: RoomActivities): any {
    this.logger.log('update RoomActivities');
    return this.workflowService.updateRoomActivities(roomActivities);
  }

  @Post('checkIn')
  checkIn(@Body() data): any {
    this.logger.log('checkIn Room Activities By Ids');
    return this.workflowService.checkIn(data.Id);
  }

  @Post('finishedCleaning')
  finishedCleaning(@Body() data): any {
    this.logger.log('finished Cleaning RoomActivities By Ids');
    return this.workflowService.finishedCleaning(data.Id);
  }
}
