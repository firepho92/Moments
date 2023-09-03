import 'reflect-metadata';
import User from './User';
import Tenant from './Tenant';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';

@Entity({name: 'tenant_by_user', schema: 'management'})
export default class TenantByUser extends BaseEntity {

  @ManyToOne(() => Tenant, tenant => tenant.tenantByUser, { nullable: false })
  @JoinColumn({name: 'tenant'})
  tenant: string | Tenant;

  @ManyToOne(() => User, user => user.tenantByUser, { nullable: false })
  @JoinColumn({name: 'user'})
  user: string | User;

  constructor(tenant: string, user: string) {
    super();
    this.tenant = tenant;
    this.user = user;
  }
}