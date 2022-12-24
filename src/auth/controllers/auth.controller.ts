import { Body, Controller, Logger, Post } from '@nestjs/common';
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

  @Post('changePassword')
  async changePassword(@Body() data) {
    this.logger.log('Update new Password');
    return await this.authService.changePassword(
      data.Id,
      data.OldPassword,
      data.NewPassword,
    );
  }
}
