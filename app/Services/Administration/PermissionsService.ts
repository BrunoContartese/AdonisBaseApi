import Permission from 'App/Models/Administration/Permission'

export default class PermissionsService {
  public async index({ request }) {
    try {
      const { q } = request
      const permissions = Permission.query()
      if (q) {
        permissions.where(function (query) {
          query.where('name', 'LIKE', `%${q}%`).orWhere('show_name', 'LIKE', `%${q}%`)
        })
      }
      return await permissions.exec()
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
