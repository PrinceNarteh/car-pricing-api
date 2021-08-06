import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/interceptors/user.dto';
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredentials: AuthCredentialsDto) {
    console.log(authCredentials);
    return this.authService.signUp(authCredentials);
  }

  @Post('signin')
  signIn(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.signIn(authCredentials);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    const parsedId = parseInt(id);
    return this.authService.findOne(parsedId);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.authService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() attrs: UpdateUserDto) {
    return this.authService.update(parseInt(id), attrs);
  }

  @Delete('/id')
  removeUser(@Param('id') id: string) {
    return this.authService.remove(parseInt(id));
  }
}
