import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

export abstract class Common {
  @ObjectIdColumn()
  _id: ObjectId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: false,
    select: false,
  })
  isDelete: boolean;

  @VersionColumn({
    select: false,
  })
  version: number;
}
