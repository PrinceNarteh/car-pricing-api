import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentials {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsNotEmpty()
  password: string;
}
