import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(authCredentials: AuthCredentialsDto) {
    const { email, password } = authCredentials;
    // see if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email already in use.');
    }

    // Hash the users password
    // 1. Generate a salt
    const salt = randomBytes(8).toString('hex');

    // 2. Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 3. Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.usersService.create(email, result);

    // return the user
    return user;
  }

  signIn(authCredentials: AuthCredentialsDto) {
    return authCredentials;
  }
}
