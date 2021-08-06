import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.signUp(authCredentials);
  }

  @Post('signin')
  signIn(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.signIn(authCredentials);
  }
}
