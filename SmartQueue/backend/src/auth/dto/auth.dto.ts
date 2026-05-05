import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Rajeshwar Singh' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'rajeshwar@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongpassword123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'rajeshwar@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongpassword123' })
  @IsString()
  password: string;
}
