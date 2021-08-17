import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ForgotPasswordRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.required(),
      rules.email(),
      rules.exists({ table: 'users', column: 'email' }),
    ]),
  })

  public messages = {
    'email.exists': 'El email ingresado no pertenece a un usuario registrado en la base de datos.',
  }
}
