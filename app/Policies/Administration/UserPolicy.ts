import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import PermissionsService from '../../Services/Security/PermissionsService'

export default class UserPolicy extends BasePolicy {
  constructor(private permissionsService: PermissionsService) {
    super()
    this.permissionsService = new PermissionsService()
  }

  public async view(user: User) {
    return await this.permissionsService.hasPermissionTo({ user: user, permission: 'users.view' })
  }

  public async create(user: User) {
    return await this.permissionsService.hasPermissionTo({ user: user, permission: 'users.create' })
  }

  public async update(user: User) {
    return await this.permissionsService.hasPermissionTo({ user: user, permission: 'users.edit' })
  }

  public async delete(user: User) {
    return await this.permissionsService.hasPermissionTo({ user: user, permission: 'users.delete' })
  }
}
