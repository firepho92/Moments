import 'reflect-metadata';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default class BaseModel {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @Column('varchar', { length: 50, default: 'user', name: 'created_by' })
  createdBy?: string;

  @UpdateDateColumn({ name: 'last_updated_at' })
  lastUpdatedAt?: Date;

  @Column('varchar', { length: 50, default: 'user', name: 'last_updated_by' })
  lastUpdatedBy?: string;

  @Column('bool', { default: 'true', name: 'active' })
  active?: boolean;
}