import 'reflect-metadata';
import EventEntity from '../tenant/Event';
import TenantByUser from './TenantByUser';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';
import Post from '../tenant/Post';

@Entity({name: 'tenant', schema: 'management'})
export default class Tenant extends BaseEntity {
  
  @Column({ type: 'varchar', length: 120, name: 'name', nullable: false })
  name: string;

  @OneToMany(() => TenantByUser, (tenantByUser: TenantByUser) => tenantByUser.tenant)
  tenantByUser: TenantByUser[];

  @OneToMany(() => EventEntity, (event: EventEntity) => event.tenant)
  events: EventEntity[]

  @OneToMany(() => Post, (post: Post) => post.tenant)
  posts: Post[];

  constructor(
    name: string,
  ) {
    super();
    this.name = name;
  }
}