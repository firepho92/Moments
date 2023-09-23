import 'reflect-metadata';
import User from './User';
import Tenant from './Tenant';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';

@Entity({name: 'tenant_by_user', schema: 'management'})
export default class TenantByUser extends BaseEntity {

  @ManyToOne(() => Tenant, tenant => tenant.tenantByUser, { nullable: false })
  @JoinColumn({name: 'tenant'})
  tenant: string | Tenant;

  @ManyToOne(() => User, user => user.tenantByUser, { nullable: false })
  @JoinColumn({name: 'user'})
  user: string | User;

  @Column({ type: 'varchar', name: 'secret_name', length: 120, nullable: false })
  secretName: string;

  constructor(tenant: string, user: string, secretName: string) {
    super();
    this.tenant = tenant;
    this.user = user;
    this.secretName = secretName;
  }
}