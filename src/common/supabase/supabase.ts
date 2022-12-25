import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { JwtPayload } from 'src/auth/models/jwt_payload.class';
import { User } from 'src/auth/models/user.class';
import { ExtractJwt } from 'passport-jwt';

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  private clientInstance: SupabaseClient;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getClient() {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.clientInstance;
    }

    this.logger.log('initialising new supabase client for new Scope.REQUEST');

    this.clientInstance = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SERVICE_ROLE_KEY'),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    const { data, error } = await this.clientInstance.auth.getUser(
      ExtractJwt.fromAuthHeaderAsBearerToken()(this.request),
    );
    if (error || !data.user.id) {
      throw new InternalServerErrorException(error.message);
    }

    return this.clientInstance;
  }

  getServerClient() {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.clientInstance;
    }

    this.logger.log('initialising new supabase client for new Scope.REQUEST');

    this.clientInstance = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SERVICE_ROLE_KEY'),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    return this.clientInstance;
  }

  async getCurrentUser(): Promise<User> {
    if (!this.clientInstance) {
      this.clientInstance = createClient(
        this.configService.get('SUPABASE_URL'),
        this.configService.get('SERVICE_ROLE_KEY'),
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        },
      );
    }
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(this.request);
    const decodedJwtAccessToken = this.jwtService.decode(token) as JwtPayload;
    const { data: dataUser, error: errorUser } = await this.clientInstance
      .from('User')
      .select()
      .eq('UserId', decodedJwtAccessToken.sub)
      .eq('Active', true);
    if (errorUser || _.isEmpty(dataUser)) {
      throw new InternalServerErrorException('Verify User Fail');
    }

    return _.first(dataUser);
  }
}
