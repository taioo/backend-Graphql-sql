
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { User } from '../entity/User'

// Provide resolver functions for your schema fields
export const userResolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      return await User.findOne(args.id, { relations: ['role'] })
    },

    getAllUsers: async () => {
      return await User.find({ relations: ['role'] })
    }

  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      const { firstName, lastName, age, email, password } = args
      try {
        const user = User.create({
          firstName,
          lastName,
          age,
          email,
          password,
          createDate: Date()
        })
        await user.save()

        return true
      } catch (error) {
        return false
      }
    },
    deleteUser: async (_: any, args: any) => {
      const { id } = args
      try {
        await User.delete(id)
        return true
      } catch (error) {
        return false
      }
    }
  }
}
