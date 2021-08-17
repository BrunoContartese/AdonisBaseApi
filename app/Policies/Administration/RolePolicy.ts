import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import PermissionsService from 'App/Services/Security/PermissionsService'

export default class RolePolicy extends BasePolicy {
  constructor(private permissionsService: PermissionsService) {
    super()
    this.permissionsService = new PermissionsService()
  }

  public async view(user: User) {
    return await this.permissionsService.hasPermissionTo({ user: user, permission: 'roles.view' })
  }

  public async create(user: User) {
    return await this.permissionsService.hasPermissionTo({ user: user, permission: 'roles.create' })
  }

  public async update(user: User) {
    return await this.permissionsService.hasPermissionTo({ user: user, permission: 'roles.edit' })
  }

  public async delete(user: User) {
    return await this.permissionsService.hasPermissionTo({ user: user, permission: 'roles.delete' })
  }
}
