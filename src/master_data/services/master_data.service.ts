import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Supabase } from 'src/common/supabase';
import * as _ from 'lodash';
import { DataResponse } from 'src/common/models/data_res.class';
import { Company } from '../models/company.class';

@Injectable()
export class MasterDataService {
  constructor(private readonly supabase: Supabase) {}

  //#region  Company
  async getAllCompany(
    keywords: string,
    limit: number,
    offset: number,
  ): Promise<any> {
    let query = this.supabase
      .getClient()
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
    const { data, error } = await this.supabase
      .getClient()
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
    const { data, error } = await this.supabase
      .getClient()
      .from('Company')
      .select()
      .eq('Id', id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('Company not found');
    }
    const { data: data2, error: error2 } = await this.supabase
      .getClient()
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
    const { data, error } = await this.supabase
      .getClient()
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
    const { data, error } = await this.supabase
      .getClient()
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
}
