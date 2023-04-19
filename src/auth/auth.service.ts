import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.userId , username: user.username};

    return {
      user: user.username,
      token: await this.jwtService.signAsync(payload),
    };
  }


  async validateToken(username:string, pass:string):Promise<any>{
    const user = await this.userService.findOne(username)
    if(user && user.password === pass) {
      const {password, ...result} = user
      return result
    }
    return null
  }
}
