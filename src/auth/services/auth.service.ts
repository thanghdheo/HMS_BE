import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Supabase } from 'src/common/supabase';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: Supabase) {}

  async login(UserName: string, Password: string): Promise<any> {
    const { data: dataUser, error: errorUser } = await this.supabase
      .getClient()
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
      .getClient()
      .auth.signInWithPassword({
        email: _.first(dataUser).email,
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

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    const { data: dataUser, error: errorUser } = await this.supabase
      .getClient()
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

    const { error } = await this.supabase.getClient().auth.signInWithPassword({
      email: _.first(dataUser).email,
      password: oldPassword,
    });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const { error: errorUpdate } = await this.supabase
      .getClient()
      .auth.updateUser({ password: newPassword });
    if (errorUpdate) {
      throw new InternalServerErrorException(errorUpdate.message);
    }
    return 'Update new Password success!';
  }
}
