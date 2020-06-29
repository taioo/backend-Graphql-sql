
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { User } from '../entity/User'

// Provide resolver functions for your schema fields
export const userResolvers = {
  Query: {
    getUser: async (_: IUser, args: IUser) => {
      return await User.findOne(args.id, { relations: ['role'] })
    },

    getAllUsers: async () => {
      return await User.find({ relations: ['role'] })
    }

  },
  Mutation: {
    createUser: async (_: IUser, args: IUser) => {
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
    deleteUser: async (_: IUser, args: IUser) => {
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

interface IUser {
  __typename: 'User';
  id: number;
  firstName: string;
  lastName: string
  age: number;
  email: string;
  password: string;
  createDate:Date;
}
