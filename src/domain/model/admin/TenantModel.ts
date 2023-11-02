import 'reflect-metadata';
import { Column, Entity, OneToMany } from 'typeorm';
import TenantByUserModel from './TenantByUserModel';
import BaseEntityModel from 'src/infrastructure/domain/model/BaseModel';

@Entity({name: 'tenant', schema: 'management'})
export default class TenantModel extends BaseEntityModel {
  @Column({ type: 'varchar', length: 120, name: 'name', nullable: false })
  name: string;

  @OneToMany(() => TenantByUserModel, (tenantByUser: TenantByUserModel) => tenantByUser.tenant)
  tenantByUser?: TenantByUserModel[];
}