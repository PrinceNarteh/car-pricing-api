import { Injectable } from '@nestjs/common';
import { AuthCredentials } from '../auth/dtos/auth-credentials.dto';

@Injectable()
export class AuthService {
  signUp(authCredentials: AuthCredentials) {
    return authCredentials;
  }

  signIn(authCredentials: AuthCredentials) {
    return authCredentials;
  }
}
