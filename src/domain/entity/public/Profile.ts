import 'reflect-metadata';
import Post from '../tenant/Post';
import User from '../management/User';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';

@Entity({name: 'profile', schema: 'public'})
export default class Profile extends BaseEntity {
  @Column({type: 'varchar', length: 120, name: 'name', nullable: false})
  name: string;

  @Column({type: 'varchar', length: 120, name: 'email', nullable: false})
  email: string;

  @OneToOne(() => User, (user: User) => user.profile)
  user: User;

  @OneToMany(() => Post, (post: Post) => post.profile)
  posts: Post[];

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }
}