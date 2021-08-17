import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import ResetPasswordToken from 'App/Models/Auth/ResetPasswordToken'

export default class ResetLinkEmail extends BaseMailer {
  constructor(private user: User, private token: ResetPasswordToken) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .subject('Recuperar contraseña')
      .from(process.env.SMTP_FROM_EMAIL ?? 'soporte@estoes.me')
      .to(this.user.email)
      .htmlView('emails/auth/reset_password', {
        user: this.user,
        token: this.token,
        frontUrl: process.env.FRONT_END_URL,
      })
  }
}
