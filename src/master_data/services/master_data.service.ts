import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Supabase } from 'src/common/supabase';
import * as _ from 'lodash';
import { DataResponse } from 'src/common/models/data_res.class';
import { Company } from '../models/company.class';
import { Hotel } from '../models/hotel.class';
import { Room } from '../models/room.class';
import { Customer } from '../models/customer.class';
import { Price } from '../models/price.class';
import { Holiday } from '../models/holiday.class';
import { Status } from '../models/status.class';

@Injectable()
export class MasterDataService {
  constructor(private readonly supabase: Supabase) {}

  //#region Company
  async getAllCompany(
    keywords: string,
    limit: number,
    offset: number,
  ): Promise<any> {
    let query = (await this.supabase.getClient())
      .from('Company')
      .select('*', { count: 'exact' })
      .or(`Code.ilike.%${keywords}%,Name.ilike.%${keywords}%`)
      .eq('Active', true);
    if (offset && limit) {
      const toValue = offset * limit;
      const fromValue = toValue - limit;
      query = query.range(fromValue, toValue - 1);
    }
    const { data, error, count } = await query;
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    let result = new DataResponse();
    result.data = data;
    result.count = count;
    return result;
  }

  async createCompany(company: Company): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Company')
      .insert(company)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updateCompany(company: Company): Promise<any> {
    var id = company.Id ? company.Id : 0;
    delete company.Id;
    const { data, error } = await (await this.supabase.getClient())
      .from('Company')
      .select()
      .eq('Id', id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Company not found');
    }
    const { data: data2, error: error2 } = await (
      await this.supabase.getClient()
    )
      .from('Company')
      .update(company)
      .match({ Id: id })
      .select();
    if (error2) {
      throw new InternalServerErrorException(error2.message);
    }
    return data2;
  }

  async getCompanyById(id: number): Promise<Company> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Company')
      .select()
      .eq('Id', id)
      .eq('Active', true);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Company not found');
    }
    return _.first(data);
  }

  async deleteCompanyById(ids: number[]): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Company')
      .update({ Active: false })
      .in('Id', ids)
      .eq('Active', true)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return _.isEmpty(data) ? 'fail' : 'success';
  }
  //#endregion

  //#region Hotel
  async getAllHotel(
    companyId: number,
    keywords: string,
    limit: number,
    offset: number,
  ): Promise<any> {
    let query = (await this.supabase.getClient())
      .from('Hotel')
      .select('*', { count: 'exact' })
      .or(`Code.ilike.%${keywords}%,Name.ilike.%${keywords}%`)
      .eq('CompanyId', companyId)
      .eq('Active', true);
    if (offset && limit) {
      const toValue = offset * limit;
      const fromValue = toValue - limit;
      query = query.range(fromValue, toValue - 1);
    }
    const { data, error, count } = await query;
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    let result = new DataResponse();
    result.data = data;
    result.count = count;
    return result;
  }

  async createHotel(hotel: Hotel): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Hotel')
      .insert(hotel)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updateHotel(hotel: Hotel): Promise<any> {
    var id = hotel.Id ? hotel.Id : 0;
    delete hotel.Id;
    const { data, error } = await (await this.supabase.getClient())
      .from('Hotel')
      .select()
      .eq('Id', id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Hotel not found');
    }
    const { data: data2, error: error2 } = await (
      await this.supabase.getClient()
    )
      .from('Hotel')
      .update(hotel)
      .match({ Id: id })
      .select();
    if (error2) {
      throw new InternalServerErrorException(error2.message);
    }
    return data2;
  }

  async getHotelById(id: number): Promise<Hotel> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Hotel')
      .select()
      .eq('Id', id)
      .eq('Active', true);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Hotel not found');
    }
    return _.first(data);
  }

  async deleteHotelById(ids: number[]): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Hotel')
      .update({ Active: false })
      .in('Id', ids)
      .eq('Active', true)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return _.isEmpty(data) ? 'fail' : 'success';
  }
  //#endregion

  //#region Master Data

  async getAllRoomType(): Promise<any> {
    let query = (await this.supabase.getClient())
      .from('RoomType')
      .select('*', { count: 'exact' })
      .eq('Active', true);
    const { data, error, count } = await query;
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    let result = new DataResponse();
    result.data = data;
    result.count = count;
    return result;
  }

  async getAllStatus(): Promise<any> {
    let query = (await this.supabase.getClient())
      .from('Status')
      .select('*', { count: 'exact' })
      .eq('Active', true);
    const { data, error, count } = await query;
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    let result = new DataResponse();
    result.data = data;
    result.count = count;
    return result;
  }

  async getAllPriceType(): Promise<any> {
    let query = (await this.supabase.getClient())
      .from('PriceType')
      .select('*', { count: 'exact' })
      .eq('Active', true);
    const { data, error, count } = await query;
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    let result = new DataResponse();
    result.data = data;
    result.count = count;
    return result;
  }

  async getStatusByCode(code: string): Promise<Status> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Status')
      .select()
      .eq('Code', code)
      .eq('Active', true);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Status not found');
    }
    return _.first(data);
  }

  //#endregion

  //#region Room
  async getAllRoom(
    companyId: number,
    hotelId: number,
    keywords: string,
    limit: number,
    offset: number,
  ): Promise<any> {
    let query = (await this.supabase.getClient())
      .from('Room')
      .select(
        '*, Status: StatusId (*), RoomActivities: RoomActivityId (*), RoomType: TypeId (*), Hotel: HotelId (*)',
        {
          count: 'exact',
        },
      )
      .or(`Code.ilike.%${keywords}%,Name.ilike.%${keywords}%`)
      .eq('CompanyId', companyId)
      .eq('HotelId', hotelId)
      .eq('Active', true);
    if (offset && limit) {
      const toValue = offset * limit;
      const fromValue = toValue - limit;
      query = query.range(fromValue, toValue - 1);
    }
    const { data, error, count } = await query;
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    let result = new DataResponse();
    result.data = data;
    result.count = count;
    return result;
  }

  async createRoom(room: Room): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Room')
      .insert(room)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updateRoom(room: Room): Promise<any> {
    var id = room.Id ? room.Id : 0;
    delete room.Id;
    const { data, error } = await (await this.supabase.getClient())
      .from('Room')
      .select()
      .eq('Id', id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Room not found');
    }
    const { data: data2, error: error2 } = await (
      await this.supabase.getClient()
    )
      .from('Room')
      .update(room)
      .match({ Id: id })
      .select();
    if (error2) {
      throw new InternalServerErrorException(error2.message);
    }
    return data2;
  }

  async getRoomById(id: number): Promise<Room> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Room')
      .select(
        '*, Status: StatusId (*), RoomActivities: RoomActivityId (*), RoomType: TypeId (*), Hotel: HotelId (*)',
      )
      .eq('Id', id)
      .eq('Active', true);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Room not found');
    }
    return _.first(data);
  }

  async deleteRoomById(ids: number[]): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Room')
      .update({ Active: false })
      .in('Id', ids)
      .eq('Active', true)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return _.isEmpty(data) ? 'fail' : 'success';
  }
  //#endregion

  //#region Customer
  async getAllCustomer(
    keywords: string,
    limit: number,
    offset: number,
  ): Promise<any> {
    let query = (await this.supabase.getClient())
      .from('Customer')
      .select('*', { count: 'exact' })
      .or(
        `CMND.ilike.%${keywords}%,Name.ilike.%${keywords}%,Phone.ilike.%${keywords}%`,
      )
      .eq('Active', true);
    if (offset && limit) {
      const toValue = offset * limit;
      const fromValue = toValue - limit;
      query = query.range(fromValue, toValue - 1);
    }
    const { data, error, count } = await query;
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    let result = new DataResponse();
    result.data = data;
    result.count = count;
    return result;
  }

  async createCustomer(customer: Customer): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Customer')
      .insert(customer)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updateCustomer(customer: Customer): Promise<any> {
    var id = customer.Id ? customer.Id : 0;
    delete customer.Id;
    const { data, error } = await (await this.supabase.getClient())
      .from('Customer')
      .select()
      .eq('Id', id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Customer not found');
    }
    const { data: data2, error: error2 } = await (
      await this.supabase.getClient()
    )
      .from('Customer')
      .update(customer)
      .match({ Id: id })
      .select();
    if (error2) {
      throw new InternalServerErrorException(error2.message);
    }
    return data2;
  }

  async getCustomerById(id: number): Promise<Customer> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Customer')
      .select()
      .eq('Id', id)
      .eq('Active', true);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Customer not found');
    }
    return _.first(data);
  }

  async deleteCustomerById(ids: number[]): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Customer')
      .update({ Active: false })
      .in('Id', ids)
      .eq('Active', true)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return _.isEmpty(data) ? 'fail' : 'success';
  }
  //#endregion

  //#region Price
  async getAllPrice(): Promise<any> {
    let query = (await this.supabase.getClient())
      .from('Price')
      .select('*', { count: 'exact' })
      .eq('Active', true);
    const { data, error, count } = await query;
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    let result = new DataResponse();
    result.data = data;
    result.count = count;
    return result;
  }

  async createPrice(prices: Price[]): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Price')
      .insert(prices)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updatePrice(prices: Price[]): Promise<any> {
    const { data: data2, error: error2 } = await (
      await this.supabase.getClient()
    )
      .from('Price')
      .upsert(prices)
      .select();
    if (error2) {
      throw new InternalServerErrorException(error2.message);
    }
    return data2;
  }

  async getPriceById(id: number): Promise<Price> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Price')
      .select()
      .eq('Id', id)
      .eq('Active', true);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Price not found');
    }
    return _.first(data);
  }

  async deletePriceById(ids: number[]): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Price')
      .update({ Active: false })
      .in('Id', ids)
      .eq('Active', true)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return _.isEmpty(data) ? 'fail' : 'success';
  }
  //#endregion

  //#region Holiday
  async getAllHoliday(year: number): Promise<any> {
    let query = (await this.supabase.getClient())
      .from('Holiday')
      .select('*', { count: 'exact' })
      .eq('Year', year)
      .eq('Active', true);
    const { data, error, count } = await query;
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    let result = new DataResponse();
    result.data = data;
    result.count = count;
    return result;
  }

  async createHoliday(holidays: Holiday[]): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Holiday')
      .insert(holidays)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updateHoliday(holidays: Holiday[]): Promise<any> {
    const { data: data2, error: error2 } = await (
      await this.supabase.getClient()
    )
      .from('Holiday')
      .upsert(holidays)
      .select();
    if (error2) {
      throw new InternalServerErrorException(error2.message);
    }
    return data2;
  }

  async getHolidayById(id: number): Promise<Holiday> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Holiday')
      .select()
      .eq('Id', id)
      .eq('Active', true);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Holiday not found');
    }
    return _.first(data);
  }

  async deleteHolidayById(ids: number[]): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('Holiday')
      .update({ Active: false })
      .in('Id', ids)
      .eq('Active', true)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return _.isEmpty(data) ? 'fail' : 'success';
  }
  //#endregion
}
