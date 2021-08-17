import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePasswordRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({}, [rules.required(), rules.confirmed(), rules.minLength(8)]),
  })

  public messages = {
    'password.required': 'Debe ingresar su nueva contraseña.',
    'confirmed': 'Las contraseñas no coinciden.',
  }
}
