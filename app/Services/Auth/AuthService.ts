import User from 'App/Models/User'
import ResetLinkEmail from 'App/Mailers/Auth/ResetLinkEmail'
import ResetPasswordToken from 'App/Models/Auth/ResetPasswordToken'
import * as randomString from 'randomstring'

export default class AuthService {
  public async login({ email, password, auth }) {
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      })
      return token
    } catch (error) {
      throw error
    }
  }

  public async updateProfile({ auth, request }) {
    try {
      const user = await User.findOrFail(auth.user.id)
      await user.merge(request).save()
      return user
    } catch (error) {
      throw error
    }
  }

  public async updatePassword({ auth, request }) {
    try {
      const user = await User.findOrFail(auth.user.id)
      user.password = request.password
      await user.save()
      return user
    } catch (error) {
      throw error
    }
  }

  public async sendResetLinkEmail({ request }) {
    try {
      const user = await User.findByOrFail('email', request.email)
      await ResetPasswordToken.query().where('email', 'like', user.email).delete()
      const token = new ResetPasswordToken()
      token.email = user.email
      token.token = randomString.generate(40)
      await token.save()
      await new ResetLinkEmail(user, token).sendLater()
      return true
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async resetPassword({ request }) {
    try {
      const user = await User.findByOrFail('email', request.email)
      await ResetPasswordToken.query().where('email', 'like', user.email).delete()
      user.password = request.password
      await user.save()
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
