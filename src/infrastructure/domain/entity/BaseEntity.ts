import 'reflect-metadata';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import BaseEntityModel from '../model/BaseEntityModel';

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
  
  @UpdateDateColumn({ name: 'last_updated_at' })
  lastUpdatedAt: Date;
  
  @Column('varchar', { length: 50, default: 'user', name: 'last_updated_by' })
  lastUpdatedBy: string;
  
  @Column('bool', { default: 'true', name: 'active' })
  active: boolean;

  constructor(port?: BaseEntityModel) {
    if (port) {
      this.id = port.id;
      this.createdAt = port.createdAt;
      this.createdBy = port.createdBy;
      this.lastUpdatedAt = port.lastUpdatedAt;
      this.lastUpdatedBy = port.lastUpdatedBy;
      this.active = port.active;
    }
  }
}