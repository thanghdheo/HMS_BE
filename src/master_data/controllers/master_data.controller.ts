import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MasterDataService } from '../services/master_data.service';
import { Company } from '../models/company.class';
import { Hotel } from '../models/hotel.class';
import { Room } from '../models/room.class';
import { Customer } from '../models/customer.class';
import { Price } from '../models/price.class';
import { Holiday } from '../models/holiday.class';

@Controller('master-data')
export class MasterDataController {
  private readonly logger = new Logger(MasterDataController.name);
  constructor(private readonly masterDataService: MasterDataService) {}

  //#region Company
  @Get('getAllCompany')
  getAllCompany(
    @Query()
    query: {
      keywords: string;
      limit: number;
      offset: number;
    },
  ) {
    this.logger.log('GET all Company');
    return this.masterDataService.getAllCompany(
      query.keywords,
      query.limit,
      query.offset,
    );
  }
  @Post('createCompany')
  createCompany(@Body() company: Company): any {
    this.logger.log('Create Company');
    return this.masterDataService.createCompany(company);
  }

  @Post('updateCompany')
  updateCompany(@Body() company: Company): any {
    this.logger.log('Update Company');
    return this.masterDataService.updateCompany(company);
  }

  @Get('getCompanyById/:id')
  getCompanyById(@Param('id') id: string): any {
    this.logger.log('get Company By Id');
    const CompanyId = parseInt(id);
    return this.masterDataService.getCompanyById(CompanyId);
  }

  @Post('deleteCompanyById')
  deleteCompanyById(@Body() data): any {
    this.logger.log('delete Company By Ids');
    return this.masterDataService.deleteCompanyById(data.Ids);
  }
  //#endregion

  //#region Hotel
  @Get('getAllHotel')
  getAllHotel(
    @Query()
    query: {
      keywords: string;
      limit: number;
      offset: number;
    },
  ) {
    this.logger.log('GET all Hotel');
    var companyId = 1;
    return this.masterDataService.getAllHotel(
      companyId,
      query.keywords,
      query.limit,
      query.offset,
    );
  }
  @Post('createHotel')
  createHotel(@Body() hotel: Hotel): any {
    this.logger.log('Create Hotel');
    var companyId = 1;
    hotel.CompanyId = companyId;
    return this.masterDataService.createHotel(hotel);
  }

  @Post('updateHotel')
  updateHotel(@Body() hotel: Hotel): any {
    this.logger.log('Update Hotel');
    var companyId = 1;
    hotel.CompanyId = companyId;
    return this.masterDataService.updateHotel(hotel);
  }

  @Get('getHotelById/:id')
  getHotelById(@Param('id') id: string): any {
    this.logger.log('get Hotel By Id');
    const HotelId = parseInt(id);
    return this.masterDataService.getHotelById(HotelId);
  }

  @Post('deleteHotelById')
  deleteHotelById(@Body() data): any {
    this.logger.log('delete Hotel By Ids');
    return this.masterDataService.deleteHotelById(data.Ids);
  }
  //#endregion

  //#region Master Data

  @Get('getAllRoomType')
  getAllRoomType() {
    this.logger.log('GET all room type');
    return this.masterDataService.getAllRoomType();
  }

  @Get('getAllStatus')
  getAllStatus() {
    this.logger.log('GET all status');
    return this.masterDataService.getAllStatus();
  }

  @Get('getAllPriceType')
  getAllPriceType() {
    this.logger.log('GET all Price Type');
    return this.masterDataService.getAllPriceType();
  }

  //#endregion

  //#region Room
  @Get('getAllRoom')
  getAllRoom(
    @Query()
    query: {
      hotelId: number;
      keywords: string;
      limit: number;
      offset: number;
    },
  ) {
    this.logger.log('GET all Room');
    var companyId = 1;
    return this.masterDataService.getAllRoom(
      companyId,
      query.hotelId,
      query.keywords,
      query.limit,
      query.offset,
    );
  }
  @Post('createRoom')
  createRoom(@Body() room: Room): any {
    this.logger.log('Create Room');
    var companyId = 1;
    room.CompanyId = companyId;
    return this.masterDataService.createRoom(room);
  }

  @Post('updateRoom')
  updateRoom(@Body() room: Room): any {
    this.logger.log('Update Room');
    var companyId = 1;
    room.CompanyId = companyId;
    return this.masterDataService.updateRoom(room);
  }

  @Get('getRoomById/:id')
  getRoomById(@Param('id') id: string): any {
    this.logger.log('get Room By Id');
    const RoomId = parseInt(id);
    return this.masterDataService.getRoomById(RoomId);
  }

  @Post('deleteRoomById')
  deleteRoomById(@Body() data): any {
    this.logger.log('delete Room By Ids');
    return this.masterDataService.deleteRoomById(data.Ids);
  }
  //#endregion

  //#region Customer
  @Get('getAllCustomer')
  getAllCustomer(
    @Query()
    query: {
      keywords: string;
      limit: number;
      offset: number;
    },
  ) {
    this.logger.log('GET all Customer');
    return this.masterDataService.getAllCustomer(
      query.keywords,
      query.limit,
      query.offset,
    );
  }
  @Post('createCustomer')
  createCustomer(@Body() customer: Customer): any {
    this.logger.log('Create Customer');
    return this.masterDataService.createCustomer(customer);
  }

  @Post('updateCustomer')
  updateCustomer(@Body() customer: Customer): any {
    this.logger.log('Update Customer');
    return this.masterDataService.updateCustomer(customer);
  }

  @Get('getCustomerById/:id')
  getCustomerById(@Param('id') id: string): any {
    this.logger.log('get Customer By Id');
    const CustomerId = parseInt(id);
    return this.masterDataService.getCustomerById(CustomerId);
  }

  @Post('deleteCustomerById')
  deleteCustomerById(@Body() data): any {
    this.logger.log('delete Customer By Ids');
    return this.masterDataService.deleteCustomerById(data.Ids);
  }
  //#endregion

  //#region Price
  @Get('getAllPrice')
  getAllPrice() {
    this.logger.log('GET all Price');
    return this.masterDataService.getAllPrice();
  }
  @Post('createPrice')
  createPrice(@Body() prices: Price[]): any {
    this.logger.log('Create Price');
    var companyId = 1;
    prices.forEach((element) => {
      element.CompanyId = companyId;
    });
    return this.masterDataService.createPrice(prices);
  }

  @Post('updatePrice')
  updatePrice(@Body() prices: Price[]): any {
    this.logger.log('Update Price');
    var companyId = 1;
    prices.forEach((element) => {
      element.CompanyId = companyId;
    });
    return this.masterDataService.updatePrice(prices);
  }

  @Get('getPriceById/:id')
  getPriceById(@Param('id') id: string): any {
    this.logger.log('get Price By Id');
    const PriceId = parseInt(id);
    return this.masterDataService.getPriceById(PriceId);
  }

  @Post('deletePriceById')
  deletePriceById(@Body() data): any {
    this.logger.log('delete Price By Ids');
    return this.masterDataService.deletePriceById(data.Ids);
  }
  //#endregion

  //#region Holiday
  @Get('getAllHoliday')
  getAllHoliday(
    @Query()
    query: {
      year: number;
    },
  ) {
    this.logger.log('GET all Holiday');
    return this.masterDataService.getAllHoliday(query.year);
  }
  @Post('createHoliday')
  createHoliday(@Body() holidays: Holiday[]): any {
    this.logger.log('Create Holiday');
    var companyId = 1;
    holidays.forEach((element) => {
      element.CompanyId = companyId;
    });
    return this.masterDataService.createHoliday(holidays);
  }

  @Post('updateHoliday')
  updateHoliday(@Body() holidays: Holiday[]): any {
    this.logger.log('Update Holiday');
    var companyId = 1;
    holidays.forEach((element) => {
      element.CompanyId = companyId;
    });
    return this.masterDataService.updateHoliday(holidays);
  }

  @Get('getHolidayById/:id')
  getHolidayById(@Param('id') id: string): any {
    this.logger.log('get Holiday By Id');
    const HolidayId = parseInt(id);
    return this.masterDataService.getHolidayById(HolidayId);
  }

  @Post('deleteHolidayById')
  deleteHolidayById(@Body() data): any {
    this.logger.log('delete Holiday By Ids');
    return this.masterDataService.deleteHolidayById(data.Ids);
  }
  //#endregion
}
