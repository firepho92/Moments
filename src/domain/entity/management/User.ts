import 'reflect-metadata';
import Role from './Role';
import Profile from '../public/Profile';
import TenantByUser from './TenantByUser';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity({name: 'user', schema: 'management'})
export default class User extends BaseEntity {
  
  @ManyToOne(() => Role, role => role.users, { nullable: false })
  @JoinColumn({ name: 'role' })
  role: Role | string;

  @OneToMany(() => TenantByUser, (tenantByUser: TenantByUser) => tenantByUser.tenant)
  tenantByUser: TenantByUser[];

  @OneToOne(() => Profile, (profile: Profile) => profile.user, { nullable: false })
  @JoinColumn({ name: 'profile' })
  profile: Profile | string;

  constructor(role: Role | string, profile: Profile | string) {
    super();
    this.role = role;
    this.profile = profile;
  }
}