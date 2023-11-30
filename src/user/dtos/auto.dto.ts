import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Password is empty' })
  @ApiProperty({ example: 'abc886' })
  readonly password: string;

  @IsNotEmpty({ message: 'Username is empty' })
  @ApiProperty({ example: 'admin' })
  readonly username: string;
}
