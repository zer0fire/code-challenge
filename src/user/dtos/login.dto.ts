import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  /**
   * unique - username
   */
  @IsNotEmpty({ message: 'Please enter the username' })
  @ApiProperty({ example: 'admin' })
  readonly username: string;

  /**
   * password
   */
  @IsNotEmpty({ message: 'Please enter the password' })
  @ApiProperty({ example: 'abc886' })
  readonly password: string;
}
