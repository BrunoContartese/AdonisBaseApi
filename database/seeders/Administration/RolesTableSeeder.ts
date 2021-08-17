import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Administration/Role'
import Permission from '../../../app/Models/Administration/Permission';

export default class RolesTableSeeder extends BaseSeeder {
  public async run() {
    const role = await Role.create({
      name: 'Administrador',
    })

    const permissions = await Permission.all()

    for(let permission of permissions) {
      role.related('permissions').attach([permission.id])
    }
  }
}
