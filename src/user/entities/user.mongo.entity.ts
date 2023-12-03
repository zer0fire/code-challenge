import { Entity, Column } from 'typeorm';
import { Common } from '@/shared/entities/common.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends Common {
  // username unique
  @ApiProperty()
  @Column('text')
  username: string;

  @ApiProperty()
  @Column()
  password: string;

  // crypto sault
  @ApiProperty()
  @Column({
    type: 'text',
    select: false,
  })
  salt: string;

  @ApiProperty()
  @Column()
  isAccountDisabled?: boolean;
}
