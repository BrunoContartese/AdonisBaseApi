import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('roles', 'RolesController').apiOnly()
  Route.get('/roles/paginated/index', 'RolesController.paginated')
  Route.post('/roles/:id/restore', 'RolesController.restore')
})
  .prefix('/api/administration')
  .middleware('auth')
  .namespace('App/Controllers/Http/Administration')
