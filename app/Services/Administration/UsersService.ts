import User from 'App/Models/User'

export default class UsersService {
  public async index({ request }) {
    try {
      const { q } = request
      const user = User.query()
      if (q) {
        user.where(function (query) {
          query
            .where('email', 'LIKE', `%${q}%`)
            .orWhere('given_name', 'LIKE', `%${q}%`)
            .orWhere('family_name', 'LIKE', `%${q}%`)
        })
      }

      return await user.preload('roles', (q) => {
        q.preload('permissions')
      }).exec()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async paginated({ request }) {
    try {
      const { q, page, pageSize } = request
      const user = User.query()

      if (q) {
        user.where(function(query) {
          query.where('email', 'LIKE', `%${q}%`)
            .orWhere('given_name', 'LIKE', `%${q}%`)
            .orWhere('family_name', 'LIKE', `%${q}%`)
        })
      }

      return await user.preload('roles', (q) => {
        q.preload('permissions')
      }).paginate(page ?? 1, pageSize ?? 15)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async show({ id }) {
    try {
      return await User.findOrFail(id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async store({ request }) {
    try {
      const user = new User()
      user.fill(request)
      await user.save()
      if(request.roles) {
        user.related('roles').sync(request.roles)
      }
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async update({ request, id }) {
    try {
      const user = await User.findOrFail(id)
      user.merge(request)
      await user.save()
      if(request.roles) {
        user.related('roles').sync(request.roles)
      }
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async destroy({ id }) {
    try {
      const user = await User.findOrFail(id)
      await user.delete()
      return
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async restore({ id }) {
    try {
      const user = await User.withTrashed().where('id', id).firstOrFail()
      await user.restore()
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
