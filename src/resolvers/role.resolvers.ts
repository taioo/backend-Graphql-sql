/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { User } from '../entity/User'
import { Role } from '../entity/Role'

// Provide resolver functions for your schema fields
export const roleResolvers = {
  Query: {

    getRole: async (_: any, args: any) => {
      return await Role.findOne(args.id, { relations: ['user'] })
    },

    getAllRoles: async () => {
      return await Role.find({ relations: ['user'] })
    }

  },
  Mutation: {
    createRole: async (_: any, args: any) => {
      const { name } = args
      try {
        const role = Role.create({
          name,
          addDate: Date()
        })
        await role.save()

        return true
      } catch (error) {
        return false
      }
    },

    addRoleToUser: async (_: any, args: any) => {
      const { userId, roleId } = args
      try {
        const user = await User.findOne(userId, { relations: ['role'] })
        const role = await Role.findOne(roleId, { relations: ['user'] })

        user!.role = role!
        role!.user = user!

        await user!.save()
        await role!.save()

        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    deleteRole: async (_: any, args: any) => {
      const { id } = args
      try {
        await Role.delete(id)
        return true
      } catch (error) {
        return false
      }
    }
  }
}
