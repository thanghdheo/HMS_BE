import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { User } from '../models/user.class';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data) {
    this.logger.log('Login');
    return await this.authService.login(data.UserName, data.Password);
  }

  @Post('resetPassword')
  async resetPassword(@Body() data) {
    this.logger.log('Login');
    return await this.authService.resetPassword(data.UserName);
  }

  @Post('changePassword')
  async changePassword(@Body() data) {
    this.logger.log('Update new Password');
    return await this.authService.changePassword(
      data.Id,
      data.OldPassword,
      data.NewPassword,
    );
  }

  //#region User
  @Get('getAllUser')
  getAllUser(
    @Query()
    query: {
      keywords: string;
      limit: number;
      offset: number;
    },
  ) {
    this.logger.log('GET all User');
    return this.authService.getAllUser(
      query.keywords,
      query.limit,
      query.offset,
    );
  }
  @Post('createUser')
  createUser(@Body() user: User): any {
    this.logger.log('Create User');
    return this.authService.createUser(user);
  }

  @Post('updateUser')
  updateUser(@Body() user: User): any {
    this.logger.log('Update User');
    return this.authService.updateUser(user);
  }

  @Get('getUserById/:id')
  getUserById(@Param('id') id: string): any {
    this.logger.log('get User By Id');
    const UserId = parseInt(id);
    return this.authService.getUserById(UserId);
  }

  @Post('deleteUserById')
  deleteUserById(@Body() data): any {
    this.logger.log('delete User By Ids');
    return this.authService.deleteUserById(data.Ids);
  }
  //#endregion
}
