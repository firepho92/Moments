import 'reflect-metadata';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import BaseEntityParams from './BaseEntityParams';

/**
 * @abstract BaseEntity
 * @classdesc Base class for all entities.
 * @property {string} id - The id of the entity.
 * @property {Date} created_at - The date when the entity was created.
 * @property {string} created_by - The user that created the entity.
 * @property {Date} updated_at - The date when the entity was updated.
 * @property {string} updated_by - The last user that updated the entity.
 * @property {boolean} active - The active status of the entity.
 */

export default abstract class BaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @Column('varchar', { length: 50, default: 'user', name: 'created_by' })
  createdBy: string;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  
  @Column('varchar', { length: 50, default: 'user', name: 'updated_by' })
  updatedBy: string;
  
  @Column('bool', { default: 'true', name: 'active' })
  active: boolean;

  constructor();
  constructor(port?: BaseEntityParams) {
    if (port) {
      this.id = port.id;
      this.createdAt = port.createdAt;
      this.createdBy = port.createdBy;
      this.updatedAt = port.updatedAt;
      this.updatedBy = port.updatedBy;
      this.active = port.active;
    }
  }
}