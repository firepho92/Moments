import 'reflect-metadata';
import UserModel from './UserModel';
import TenantModel from './TenantModel';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntityModel from 'src/infrastructure/domain/model/BaseModel';

@Entity({name: 'tenant_by_user', schema: 'management'})
export default class TenantByUserModel extends BaseEntityModel {
  @ManyToOne(() => TenantModel, tenant => tenant.tenantByUser, { nullable: false })
  @JoinColumn({name: 'tenant'})
  tenant?: string | TenantModel;

  @ManyToOne(() => UserModel, user => user.tenantByUser, { nullable: false })
  @JoinColumn({name: 'user'})
  user?: string | UserModel;

  @Column({ type: 'varchar', name: 'secret_name', length: 120, nullable: false })
  secret?: string;
}