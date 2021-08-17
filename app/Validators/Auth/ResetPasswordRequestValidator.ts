import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResetPasswordRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.required(),
      rules.exists({ table: 'password_resets', column: 'email' }),
    ]),
    token: schema.string({}, [
      rules.required(),
      rules.exists({ table: 'password_resets', column: 'token' }),
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.confirmed(),
      rules.minLength(8)
    ])
  })

  public messages = {
    'email.required': 'Debe ingresar el email.',
    'email.exists': 'El email ingresado no tiene una petición de recupero de contraseña activa.',
    'token.required': 'El token ingresado no es válido.',
    'token.exists': 'El token ingresado no es válido.',
    'password.required': 'Debe ingresar la contraseña.',
    'password.confirmed': 'Las contraseñas ingresadas no coinciden.',
  }
}
