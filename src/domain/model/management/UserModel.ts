import RoleModel from './RoleModel';
import ProfileModel from '../public/ProfileModel';
import BaseEntityModel from 'src/infrastructure/domain/model/BaseModel';
import TenantByUserModel from './TenantByUserModel';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity({name: 'user', schema: 'management'})
export default class UserModel extends BaseEntityModel {
  @ManyToOne(() => RoleModel, role => role.users, { nullable: false })
  @JoinColumn({ name: 'role' })
  role?: RoleModel | string;

  @OneToMany(() => TenantByUserModel, (tenantByUser: TenantByUserModel) => tenantByUser.tenant)
  tenantByUser?: TenantByUserModel[];

  @OneToOne(() => ProfileModel, (profile: ProfileModel) => profile.user, { nullable: false })
  @JoinColumn({ name: 'profile' })
  profile?: ProfileModel | string;
}