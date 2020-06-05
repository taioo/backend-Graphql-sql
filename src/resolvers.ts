/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from './entity/User'
import { Role } from './entity/Role'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import * as Moment from 'moment'

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      return await User.findOne(args.id, { relations: ['role'] })
    },

    getRole: async (_: any, args: any) => {
      console.log(await Role.findOne(args.id, { relations: ['user'] }))
      return await Role.findOne(args.id, { relations: ['user'] })
    },

    getAllUsers: async () => {
      return await User.find({ relations: ['role'] })
    },

    getAllRoles: async () => {
      return await Role.find({ relations: ['user'] })
    }

  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      const { firstName, lastName, age, email } = args
      try {
        const user = User.create({
          firstName,
          lastName,
          age,
          email,
          createDate: Date()
        })
        await user.save()

        return true
      } catch (error) {
        return false
      }
    },
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

        console.log(role!)

        await user!.save()
        await role!.save()

        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },

    deleteUser: async (_: any, args: any) => {
      const { id } = args
      try {
        await User.delete(id)
        console.log(User)
        return true
      } catch (error) {
        return false
      }
    },
    deleteRole: async (_: any, args: any) => {
      const { id } = args
      try {
        await User.delete(id)
        console.log(User)
        return true
      } catch (error) {
        return false
      }
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom description for the date scalar',
    parseValue (value) {
      return Moment(value) // value from the client
    },
    serialize (value) {
      return Moment(value).format() // value sent to the client
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.STRING) {
        return Moment(ast.value) // ast value is always in string format
      }
      return null
    }
  })
}
