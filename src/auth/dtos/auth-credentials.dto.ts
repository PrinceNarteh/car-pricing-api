import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsNotEmpty()
  password: string;
}
