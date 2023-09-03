import User from 'src/domain/entity/admin/User';
import Role from 'src/domain/entity/admin/Role';
import Tenant from 'src/domain/entity/admin/Tenant';
import TenantByUser from 'src/domain/entity/admin/TenantByUser';
import Profile from 'src/domain/entity/public/Profile';

export default [
  Role,
  Tenant,
  TenantByUser,
  User,
  Profile
]