import 'reflect-metadata';
import Post from './Post';
import Tenant from '../management/Tenant';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';

@Entity({name: 'event'})
export default class Event extends BaseEntity {
  @Column({type: 'varchar', name: 'name', length: 120})
  name: string;

  @ManyToOne(() => Tenant, (tenant: Tenant) => tenant.events, { nullable: false })
  tenant: Tenant | string;

  @OneToMany(() => Post, (post: Post) => post.event)
  posts: Post[];

  constructor(
    name: string,
    tenant: Tenant | string,
  ) {
    super();
    this.name = name;
    this.tenant = tenant;
  }
}