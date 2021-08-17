import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Role from 'App/Models/Administration/Role'

export default class UsersTableSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      givenName: 'Soporte',
      familyName: 'EstoEs',
      email: 'soporte@estoes.me',
      password: 'secret',
    })

    /* Administrador Role */
    const role = await Role.findOrFail(1)
    user.related('roles').attach([role.id])
  }
}
