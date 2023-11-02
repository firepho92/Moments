import { Column, Entity, OneToMany } from 'typeorm';
import UserModel from './UserModel';
import BaseEntityModel from 'src/infrastructure/domain/model/BaseModel';

@Entity({name: 'role', schema: 'management'})
export default class RoleModel extends BaseEntityModel {
  @Column({type: 'varchar', length: 120, name: 'name'})
  name?: string;

  @OneToMany(() => UserModel, (user: UserModel) => user.role)
  users?: UserModel[];
}