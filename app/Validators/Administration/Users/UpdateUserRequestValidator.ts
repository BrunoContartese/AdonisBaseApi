import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreUserRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.required(),
      rules.unique({
        table: 'users',
        column: 'email',
        caseInsensitive: true,
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
    givenName: schema.string({}, [rules.required()]),
    familyName: schema.string({}, [rules.required()]),
    password: schema.string({}, [rules.required(), rules.confirmed(), rules.minLength(8)]),
  })

  public messages = {
    'email.required': 'Debe ingresar el email.',
    'email.unique': 'El email ingresado ya existe en la base de datos.',
    'givenName.required': 'Debe ingresar el nombre.',
    'familyName.required': 'Debe ingresar el apellido.',
    'password.required': 'Debe ingresar la contraseña.',
    'password.confirmed': 'Las contraseñas no coinciden.',
    'password.minLength': 'La contraseña debe contener como mínimo 8 caracteres.',
  }
}
