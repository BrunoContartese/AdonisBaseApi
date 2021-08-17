 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RolesService from '../../../Services/Administration/RolesService';
import StoreRoleRequestValidator from '../../../Validators/Administration/Roles/StoreRoleRequestValidator';
import UpdateRoleRequestValidator from '../../../Validators/Administration/Roles/UpdateRoleRequestValidator';

export default class RolesController {
    constructor(private rolesService: RolesService) {
        this.rolesService = new RolesService()
      }
    
      public async index(ctx: HttpContextContract) {
        await ctx.bouncer.with('RolePolicy').authorize('view')
        await this.rolesService
          .index({ request: ctx.request.qs() })
          .then((roles) => {
            ctx.response.status(200).send(roles)
          })
          .catch((error) => {
            console.log(error)
            ctx.response.status(400).send(error.message)
          })
      }
    
      public async paginated(ctx: HttpContextContract) {
        await ctx.bouncer.with('RolePolicy').authorize('view')
        await this.rolesService
          .paginated({ request: ctx.request.all() })
          .then((roles) => {
            ctx.response.status(200).send(roles)
          })
          .catch((error) => {
            console.log(error)
            ctx.response.status(400).send(error.message)
          })
      }
    
      public async show(ctx: HttpContextContract) {
        await ctx.bouncer.with('RolePolicy').authorize('view')
        await this.rolesService
          .show({ id: ctx.params.id })
          .then((role) => {
            ctx.response.status(200).send(role)
          })
          .catch((error) => {
            console.log(error)
            ctx.response.status(400).send(error.message)
          })
      }
    
      public async store(ctx: HttpContextContract) {
        await ctx.bouncer.with('RolePolicy').authorize('create')
        await ctx.request.validate(StoreRoleRequestValidator)
        await this.rolesService
          .store({ request: ctx.request.except(['password_confirmation']) })
          .then((role) => {
            ctx.response.status(200).send(role)
          })
          .catch((error) => {
            console.log(error)
            ctx.response.status(400).send(error.message)
          })
      }
    
      public async update(ctx: HttpContextContract) {
        await ctx.bouncer.with('RolePolicy').authorize('update')
        await ctx.request.validate(UpdateRoleRequestValidator)
        await this.rolesService
          .update({ request: ctx.request.except(['password_confirmation']), id: ctx.params.id })
          .then((role) => {
            ctx.response.status(200).send(role)
          })
          .catch((error) => {
            console.log(error)
            ctx.response.status(400).send(error.message)
          })
      }
    
      public async destroy(ctx: HttpContextContract) {
        await ctx.bouncer.with('RolePolicy').authorize('delete')
        await this.rolesService
          .destroy({ id: ctx.params.id })
          .then(() => {
            ctx.response.status(204).send(null)
          })
          .catch((error) => {
            console.log(error)
            ctx.response.status(400).send(error.message)
          })
      }
}
