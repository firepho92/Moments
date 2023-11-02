import 'reflect-metadata';
import TenantByUser from './TenantByUser';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';

@Entity({name: 'tenant', schema: 'management'})
export default class Tenant extends BaseEntity {
  
  @Column({ type: 'varchar', length: 120, name: 'name', nullable: false })
  name: string;

  @OneToMany(() => TenantByUser, (tenantByUser: TenantByUser) => tenantByUser.tenant)
  tenantByUser: TenantByUser[];

  constructor(
    name: string,
  ) {
    super();
    this.name = name;
  }
}