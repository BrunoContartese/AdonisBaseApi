import AuthService from 'App/Services/Auth/AuthService'
import UpdateProfileRequestValidator from 'App/Validators/Auth/UpdateProfileRequestValidator'
import UpdatePasswordRequestValidator from 'App/Validators/Auth/UpdatePasswordRequestValidator'
import ForgotPasswordRequestValidator from 'App/Validators/Auth/ForgotPasswordRequestValidator'
import ResetPasswordRequestValidator from 'App/Validators/Auth/ResetPasswordRequestValidator'

class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public async login({ auth, request, response }) {
    await this.authService
      .login({
        email: request.input('email'),
        password: request.input('password'),
        auth,
      })
      .then((token) => {
        response.status(200).send(token)
      })
      .catch(() => {
        response.status(400).send('Las credenciales son incorrectas.')
      })
  }

  public async user({ auth, response }) {
    response.send(auth.user)
  }

  public async updateProfile({ auth, response, request }) {
    await request.validate(UpdateProfileRequestValidator)
    await this.authService
      .updateProfile({
        auth,
        request: request.all(),
      })
      .then((user) => {
        response.status(200).send(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  public async updatePassword({ auth, response, request }) {
    await request.validate(UpdatePasswordRequestValidator)
    await this.authService
      .updatePassword({
        auth,
        request: request.all(),
      })
      .then((user) => {
        response.status(200).send(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  public async forgotPassword({ response, request }) {
    await request.validate(ForgotPasswordRequestValidator)
    await this.authService
      .sendResetLinkEmail({
        request: request.all(),
      })
      .then(() => {
        response.status(200).send('Se ha envíado un correo electrónico.')
      })
      .catch((error) => {
        console.log(error)
        response.status(400).send('No se pudo envíar el correo.')
      })
  }

  public async resetPassword({ response, request }) {
    await request.validate(ResetPasswordRequestValidator)
    await this.authService
      .resetPassword({
        request: request.all(),
      })
      .then((user) => {
        response.status(200).send(user)
      })
      .catch((error) => {
        console.log(error)
        response.status(400).send('No se pudo envíar el correo.')
      })
  }
}

export default AuthController
