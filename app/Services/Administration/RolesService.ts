import Role from "App/Models/Administration/Role"

export default class RolesService {
    public async index({ request }) {
      try {
        const { q } = request
        const roles = Role.query()
        console.log(q)
        if (q) {
            roles.where(function (query) {
            query
              .where('name', 'LIKE', `%${q}%`)
          })
        }
      
  
        return await roles.preload('permissions').exec()
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  
    public async paginated({ request }) {
      try {
        const { q, page, pageSize } = request
        const roles = Role.query()
  
        if (q) {
            roles.where(function(query) {
            query.where('name', 'LIKE', `%${q}%`)
          })
        }
  
        return await roles.preload('permissions').paginate(page ?? 1, pageSize ?? 15)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  
    public async show({ id }) {
      try {
        return await Role.findOrFail(id)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  
    public async store({ request }) {
      try {
        const role = new Role()
        role.fill(request)
        await role.save()
        if(request.permissions) {
            role.related('permissions').sync(request.permissions)
          }
        return role
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  
    public async update({ request, id }) {
      try {
        const role = await Role.findOrFail(id)
        role.merge(request)
        await role.save()
        if(request.permissions) {
            role.related('permissions').sync(request.permissions)
        }
        return role
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  
    public async destroy({ id }) {
      try {
        const role = await Role.findOrFail(id)
        await role.delete()
        return
      } catch (error) {
        console.log(error)
        throw error
      }
    }
}