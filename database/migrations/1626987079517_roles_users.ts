import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RolesUsers extends BaseSchema {
  protected tableName = 'roles_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('role_id').unsigned().notNullable().references('id').inTable('roles')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
