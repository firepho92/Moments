import 'reflect-metadata';
import User from './User';
import Tenant from './Tenant';

import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';


export default class TenantByUser extends BaseEntity {
  
  tenant: string | Tenant;
  
  user: string | User;

  secretName: string;

  constructor(tenant: string, user: string, secretName: string) {
    super();
    this.tenant = tenant;
    this.user = user;
    this.secretName = secretName;
  }
}