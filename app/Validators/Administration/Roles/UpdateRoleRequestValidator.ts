import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateRoleRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.unique({
        table: 'roles',
        column: 'name',
        caseInsensitive: true,
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
  })

  public messages = {
    'name.required': 'Debe ingresar el nombre del rol',
    'name.unique': 'El nombre del rol ingresado ya esta siendo utilizado.',
  }
}
