import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Username is empty' })
  @ApiProperty({ example: 'admin' })
  readonly username: string;

  @IsNotEmpty({ message: 'Password is empty' })
  @ApiProperty({ example: 'abc886' })
  readonly password: string;
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is empty' })
  @ApiProperty({ example: 'admin' })
  username: string;

  @IsNotEmpty({ message: 'Password is empty' })
  @ApiProperty({ example: 'abc886' })
  password: string;

  salt?: string;

  isAccountDisabled: boolean;
}
