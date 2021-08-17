import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProfileRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    given_name: schema.string({}, [rules.required()]),
    family_name: schema.string({}, [rules.required()]),
    email: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true, whereNot: { id: this.ctx.auth?.user?.id } }),
      rules.email(),
    ]),
  })

  public messages = {
    'givenName.required': 'Debe ingresar su Nombre.',
    'familyName.required': 'Debe ingresar su Apellido.',
    'email.required': 'Debe ingresar su dirección de correo electrónico.',
    'email.unique': 'La dirección de correo electrónico ingresada ya existe en la base de datos.',
    'email.email': 'La dirección de correo electrónico ingresada no tiene un formato válido.',
  }
}
