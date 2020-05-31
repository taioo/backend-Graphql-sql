/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from './entity/User'

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const { id } = args

      return await User.findOne({ where: { id: id } })
    }
  },
  Mutation: {
    addUser: async (_: any, args: any) => {
      const { firstName, lastName, age } = args
      try {
        const user = User.create({
          firstName,
          lastName,
          age
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
        console.log(User)
        return true
      } catch (error) {
        return false
      }
    }
  }
}
