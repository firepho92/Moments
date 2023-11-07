import UserModel from '../management/UserModel';
import { Column, Entity, OneToOne } from 'typeorm';
import BaseEntityModel from 'src/infrastructure/domain/model/BaseModel';

@Entity({name: 'profile', schema: 'public'})
export default class ProfileModel extends BaseEntityModel {
  @Column({type: 'varchar', length: 120, name: 'name', nullable: false})
  name: string;

  @Column({type: 'varchar', length: 120, name: 'email', nullable: false})
  email: string;

  @OneToOne(() => UserModel, (user: UserModel) => user.profile)
  user: UserModel | string;
}