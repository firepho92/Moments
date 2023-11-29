import 'reflect-metadata';
import Profile from '../public/Profile';
import EventEntity from '../tenant/Event';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';
import Tenant from '../management/Tenant';

@Entity({ name: 'post' })
export default class Post extends BaseEntity {

  @Column({ type: 'varchar', length: '120', name: 'title' })
  title: string;

  @Column({ type: 'varchar', length: '400', name: 'description' })
  description: string;

  @ManyToOne(() => Profile, (profile: Profile) => profile.posts, { nullable: false })
  profile: Profile | string;

  @ManyToOne(() => EventEntity, (event: EventEntity) => event.posts, { nullable: false })
  event: EventEntity | string;

  @ManyToOne(() => Tenant, (tenant: Tenant) => tenant.posts, { nullable: true })
  tenant: Tenant | string;

  @ManyToOne(() => Post, (post: Post) => post.posts, { nullable: true })
  post: Post | string;

  @OneToMany(() => Post, (post: Post) => post.post)
  posts: Post[];

  constructor(
    title: string,
    description: string,
    profile: Profile | string,
    event: EventEntity | string,
    tenant: Tenant | string,
    post: Post | string,
  ) {
    super();
    this.title = title;
    this.description = description;
    this.profile = profile;
    this.event = event;
    this.tenant = tenant;
    this.post = post;
  }
}