import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionsService from '../../../Services/Administration/PermissionsService';

export default class PermissionsController {
  constructor(private permissionsService: PermissionsService) {
    this.permissionsService = new PermissionsService()
  }

  public async index(ctx: HttpContextContract) {
    await ctx.bouncer.with('RolePolicy').authorize('view')
    await this.permissionsService
      .index({ request: ctx.request.qs() })
      .then((permissions) => {
        ctx.response.status(200).send(permissions)
      })
      .catch((error) => {
        console.log(error)
        ctx.response.status(400).send(error.message)
      })
  }
}
