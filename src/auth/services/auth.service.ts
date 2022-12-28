import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Supabase } from 'src/common/supabase';
import * as _ from 'lodash';
import { DataResponse } from 'src/common/models/data_res.class';
import { User } from '../models/user.class';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: Supabase) {}

  async login(UserName: string, Password: string): Promise<any> {
    const { data: dataUser, error: errorUser } = await this.supabase
      .getServerClient()
      .from('User')
      .select()
      .or(`UserName.eq.${UserName}, Email.eq.${UserName}`)
      .eq('Active', true);
    if (errorUser) {
      throw new InternalServerErrorException(errorUser.message);
    }
    if (_.isEmpty(dataUser)) {
      throw new NotFoundException('User not found');
    }

    const { data, error } = await this.supabase
      .getServerClient()
      .auth.signInWithPassword({
        email: _.first(dataUser).Email,
        password: Password,
      });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return {
      ..._.first(data),
      access_token: data.session.access_token,
    };
  }

  async resetPassword(UserName: string): Promise<any> {
    const { data: dataUser, error: errorUser } = await this.supabase
      .getServerClient()
      .from('User')
      .select()
      .or(`UserName.eq.${UserName}, Email.eq.${UserName}`)
      .eq('Active', true);
    if (errorUser) {
      throw new InternalServerErrorException(errorUser.message);
    }
    if (_.isEmpty(dataUser)) {
      throw new NotFoundException('User not found');
    }

    const { error: errorUpdate } = await this.supabase
      .getServerClient()
      .auth.admin.updateUserById(_.first(dataUser).UserId, {
        password: '123456',
      });
    if (errorUpdate) {
      throw new InternalServerErrorException(errorUpdate.message);
    }
    return 'Reset Password success!';
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    const { data: dataUser, error: errorUser } = await (
      await this.supabase.getClient()
    )
      .from('User')
      .select()
      .eq('Id', id)
      .eq('Active', true);
    if (errorUser) {
      throw new InternalServerErrorException(errorUser.message);
    }

    if (_.isEmpty(dataUser)) {
      throw new NotFoundException('User not found');
    }

    const { error } = await (
      await this.supabase.getClient()
    ).auth.signInWithPassword({
      email: _.first(dataUser).Email,
      password: oldPassword,
    });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const { error: errorUpdate } = await (
      await this.supabase.getClient()
    ).auth.admin.updateUserById(_.first(dataUser).UserId, {
      password: newPassword,
    });
    if (errorUpdate) {
      throw new InternalServerErrorException(errorUpdate.message);
    }
    return 'Update new Password success!';
  }

  //#region User
  async getAllUser(
    keywords: string,
    limit: number,
    offset: number,
  ): Promise<any> {
    let query = (await this.supabase.getClient())
      .from('User')
      .select('*', { count: 'exact' })
      .or(
        `UserName.ilike.%${keywords}%,FullName.ilike.%${keywords}%,Email.ilike.%${keywords}%,Phone.ilike.%${keywords}%`,
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

  async createUser(user: User): Promise<any> {
    const { data: dataSupabase, error: errorSupabase } = await (
      await this.supabase.getClient()
    ).auth.signUp({
      email: user.Email,
      password: '123456',
    });
    if (errorSupabase) {
      throw new InternalServerErrorException(errorSupabase.message);
    }
    user.UserId = dataSupabase.user.id;
    const { data, error } = await (await this.supabase.getClient())
      .from('User')
      .insert(user)
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updateUser(user: User): Promise<any> {
    var id = user.Id ? user.Id : 0;
    delete user.Id;
    const { data, error } = await (await this.supabase.getClient())
      .from('User')
      .select()
      .eq('Id', id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('User not found');
    }
    const { data: data2, error: error2 } = await (
      await this.supabase.getClient()
    )
      .from('User')
      .update(user)
      .match({ Id: id })
      .select();
    if (error2) {
      throw new InternalServerErrorException(error2.message);
    }
    return data2;
  }

  async getUserById(id: number): Promise<User> {
    const { data, error } = await (await this.supabase.getClient())
      .from('User')
      .select()
      .eq('Id', id)
      .eq('Active', true);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (_.isEmpty(data)) {
      throw new NotFoundException('User not found');
    }
    return _.first(data);
  }

  async deleteUserById(ids: number[]): Promise<any> {
    const { data, error } = await (await this.supabase.getClient())
      .from('User')
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
