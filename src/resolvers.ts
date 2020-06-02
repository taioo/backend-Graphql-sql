/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from './entity/User'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import * as Moment from 'moment'

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const { id } = args

      return await User.findOne({ where: { id: id } })
    },

    getAllUsers: async () => {
      return await User.find()
    }

  },
  Mutation: {
    addUser: async (_: any, args: any) => {
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
