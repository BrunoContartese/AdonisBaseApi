import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Administration/Permission'

export default class UsersModulePermissionsSeeder extends BaseSeeder {
  public async run () {
    const name = 'Usuarios'
    const permission = 'users'

    await Permission.createMany([
      {
        showName: `Ver ${name}`,
        name: `${permission}.view`,
      },
      {
        showName: `Crear ${name}`,
        name: `${permission}.create`,
      },
      {
        showName: `Editar ${name}`,
        name: `${permission}.edit`,
      },
      {
        showName: `Eliminar ${name}`,
        name: `${permission}.delete`,
      },
    ])
  }
}
