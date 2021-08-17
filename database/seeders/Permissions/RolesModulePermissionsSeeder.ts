import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Administration/Permission'

export default class RolesModulePermissionsSeederSeeder extends BaseSeeder {
  public async run () {
    const name = 'Roles'
    const permission = 'roles'

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
