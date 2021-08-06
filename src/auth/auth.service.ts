import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
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

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.findOne(id);
  }

  async find(email: string): Promise<User[]> {
    return await this.userRepository.find({ email });
  }

  async update(id: number, attrs: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
