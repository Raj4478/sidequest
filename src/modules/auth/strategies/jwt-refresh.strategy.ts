import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET') as string,
      passReqToCallback: true as true,
    });
  }

  async validate(req: Request, payload: { sub: string; email: string }) {
    const authHeader = req.get('Authorization');
    if (!authHeader) throw new UnauthorizedException();
    const refreshToken = authHeader.replace('Bearer ', '').trim();
    const user = await this.usersService.findById(payload.sub);
    if (!user || user.refresh_token !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return { ...user, refreshToken };
  }
}
