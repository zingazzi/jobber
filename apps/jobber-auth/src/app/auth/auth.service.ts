import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { User } from '../users/model/user.model';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './dto/token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput, response: Response): Promise<User> {
    const user = await this.verifyUser(loginInput.email, loginInput.password);
    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() +
        parseInt(this.configService.getOrThrow('AUTH_EXPIRATION_MS')),
    );
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    response.cookie('Authentication', token, {
      httpOnly: true,
      secure: this.configService.get('ENV_NODE') === 'production',
      expires,
    });
    return user;
  }

  private async verifyUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userService.getUser({ email });
      const autenticate = await compare(password, user.password);
      if (!autenticate) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err: any) {
      throw new UnauthorizedException('Credential not valid');
    }
  }
}
