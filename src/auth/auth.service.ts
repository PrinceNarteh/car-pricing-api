import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(authCredentials: AuthCredentialsDto) {
    const { email, password } = authCredentials;
    const users = await this.usersService.find(email)[0];
    if (users.length) {
      throw new BadRequestException('Email already in use.');
    }
  }

  signIn(authCredentials: AuthCredentialsDto) {
    return authCredentials;
  }
}
