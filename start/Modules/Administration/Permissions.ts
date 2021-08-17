import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/permissions', 'PermissionsController.index')
})
  .prefix('/api/administration')
  .middleware('auth')
  .namespace('App/Controllers/Http/Administration')
