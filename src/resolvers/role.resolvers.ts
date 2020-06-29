/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { User } from '../entity/User'
import { Role } from '../entity/Role'

// Provide resolver functions for your schema fields
export const roleResolvers = {
  Query: {

    getRole: async (_: IRole, args: IRole) => {
      return await Role.findOne(args.id, { relations: ['user'] })
    },

    getAllRoles: async () => {
      return await Role.find({ relations: ['user'] })
    }

  },
  Mutation: {
    createRole: async (_: IRole, args: IRole) => {
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

    addRoleToUser: async (_: IAddRoleToUser, args: IAddRoleToUser) => {
      console.log(args + ' ' + _)
      const { userId, roleId } = args
      console.log(args)
      try {
        const user = await User.findOne(userId, { relations: ['role'] })
        const role = await Role.findOne(roleId, { relations: ['user'] })
        if (!role || !user) {
          return false
        }
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
    deleteRole: async (_: IRole, args: IRole) => {
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

interface IRole {
  __typename: 'Role';
  id: string;
  name: string;
  addDate: Date;
  user: User
}

interface IAddRoleToUser {
  __typename: 'AddRoleToUser';
  userId: number;
  roleId: number;
}
