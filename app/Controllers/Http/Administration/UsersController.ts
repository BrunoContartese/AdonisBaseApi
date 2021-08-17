import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from 'App/Services/Administration/UsersService'
import StoreUserRequestValidator from 'App/Validators/Administration/Users/StoreUserRequestValidator'
import UpdateUserRequestValidator from 'App/Validators/Administration/Users/UpdateUserRequestValidator'

export default class UsersController {
  constructor(private usersService: UsersService) {
    this.usersService = new UsersService()
  }

  public async index(ctx: HttpContextContract) {
    await ctx.bouncer.with('UserPolicy').authorize('view')
    await this.usersService
      .index({ request: ctx.request.qs() })
      .then((users) => {
        ctx.response.status(200).send(users)
      })
      .catch((error) => {
        console.log(error)
        ctx.response.status(400).send(error.message)
      })
  }

  public async paginated(ctx: HttpContextContract) {
    await ctx.bouncer.with('UserPolicy').authorize('view')
    await this.usersService
      .paginated({ request: ctx.request.all() })
      .then((users) => {
        ctx.response.status(200).send(users)
      })
      .catch((error) => {
        console.log(error)
        ctx.response.status(400).send(error.message)
      })
  }

  public async show(ctx: HttpContextContract) {
    await ctx.bouncer.with('UserPolicy').authorize('view')
    await this.usersService
      .show({ id: ctx.params.id })
      .then((user) => {
        ctx.response.status(200).send(user)
      })
      .catch((error) => {
        console.log(error)
        ctx.response.status(400).send(error.message)
      })
  }

  public async store(ctx: HttpContextContract) {
    await ctx.bouncer.with('UserPolicy').authorize('create')
    await ctx.request.validate(StoreUserRequestValidator)
    await this.usersService
      .store({ request: ctx.request.except(['password_confirmation']) })
      .then((user) => {
        ctx.response.status(200).send(user)
      })
      .catch((error) => {
        console.log(error)
        ctx.response.status(400).send(error.message)
      })
  }

  public async update(ctx: HttpContextContract) {
    await ctx.bouncer.with('UserPolicy').authorize('update')
    await ctx.request.validate(UpdateUserRequestValidator)
    await this.usersService
      .update({ request: ctx.request.except(['password_confirmation']), id: ctx.params.id })
      .then((user) => {
        ctx.response.status(200).send(user)
      })
      .catch((error) => {
        console.log(error)
        ctx.response.status(400).send(error.message)
      })
  }

  public async destroy(ctx: HttpContextContract) {
    await ctx.bouncer.with('UserPolicy').authorize('delete')
    await this.usersService
      .destroy({ id: ctx.params.id })
      .then(() => {
        ctx.response.status(204).send(null)
      })
      .catch((error) => {
        console.log(error)
        ctx.response.status(400).send(error.message)
      })
  }

  public async restore(ctx: HttpContextContract) {
    await ctx.bouncer.with('UserPolicy').authorize('delete')
    await this.usersService
      .restore({ id: ctx.params.id })
      .then((user) => {
        ctx.response.status(200).send(user)
      })
      .catch((error) => {
        console.log(error)
        ctx.response.status(400).send(error)
      })
  }
}
