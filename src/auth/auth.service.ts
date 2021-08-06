import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  signUp(authCredentials: AuthCredentialsDto) {
    const user = this.userRepository.create(authCredentials);
    return this.userRepository.save(user);
  }

  signIn(authCredentials: AuthCredentialsDto) {
    return authCredentials;
  }
}
