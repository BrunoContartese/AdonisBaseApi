import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly()
  Route.get('/users/paginated/index', 'UsersController.paginated')
  Route.post('/users/:id/restore', 'UsersController.restore')
})
  .prefix('/api/administration')
  .middleware('auth')
  .namespace('App/Controllers/Http/Administration')
