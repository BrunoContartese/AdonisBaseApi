import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  public async run () {
    /*Permisos*/
    await this.runSeeder(await import('../Permissions/RolesModulePermissionsSeeder'))
    await this.runSeeder(await import('../Permissions/UsersModulePermissionsSeeder'))

    /*Usuarios y Roles*/
    await this.runSeeder(await import('../Administration/RolesTableSeeder'))
    await this.runSeeder(await import('../Administration/UsersTableSeeder'))
  }

  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in dev mode and seeder is development
     * only
     */
    if (seeder.default.developmentOnly && !Application.inDev) {
      return
    }

    await new seeder.default(this.client).run()
  }

}
