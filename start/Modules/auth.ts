import Route from '@ioc:Adonis/Core/Route'

/**
 * /api
 */
Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/forgotPassword', 'AuthController.forgotPassword')
  Route.post('/resetPassword', 'AuthController.resetPassword')

  Route.group(() => {
    Route.post('/logout', 'AuthController.logout')
  }).middleware('auth')

  /**
   * /api/auth
   */
  Route.group(() => {
    Route.get('/user', 'AuthController.user')
    Route.put('/user', 'AuthController.updateProfile')
    Route.put('/user/updatePassword', 'AuthController.updatePassword')
  })
    .prefix('/auth')
    .middleware('auth')
})
  .prefix('/api')
  .namespace('App/Controllers/Http/Auth')
