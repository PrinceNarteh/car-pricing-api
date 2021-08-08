import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/interceptors/user.dto';
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async signUp(
    @Body() authCredentials: AuthCredentialsDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signUp(authCredentials);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signIn(
    @Body() authCredentials: AuthCredentialsDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signIn(authCredentials);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    const parsedId = parseInt(id);
    return this.usersService.findOne(parsedId);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() attrs: UpdateUserDto) {
    return this.usersService.update(parseInt(id), attrs);
  }

  @Delete('/id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
