import User from 'src/domain/entity/management/User';
import Role from 'src/domain/entity/management/Role';
import Tenant from 'src/domain/entity/management/Tenant';
import TenantByUser from 'src/domain/entity/management/TenantByUser';
import Profile from 'src/domain/entity/public/Profile';

export default [
  Role,
  Tenant,
  TenantByUser,
  User,
  Profile
]