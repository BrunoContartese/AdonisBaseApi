import Permissions from '../../../database/migrations/1626985701497_permissions';
export default class PermissionsService {
  public async hasPermissionTo({ user, permission }) {
    await user.load('roles')
    const res = await user.related('roles').query().whereHas('permissions', (q) => {
      q.where('name', 'LIKE', permission)
    })
    .first()
    return res ? true : false
  }
}
