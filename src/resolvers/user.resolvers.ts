
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from '../entity/User'
import { sign } from 'jsonwebtoken'
import bcrypt = require('bcryptjs')
const SECRET_KEY = process.env.SECRET_KEY || 'my8secret8key'

// Provide resolver functions for your schema fields
export const userResolvers = {
  Query: {
    getUser: async (_: User, args: User) => {
      return await User.findOne(args.id, { relations: ['role'] })
    },

    getAllUsers: async () => {
      return await User.find({ relations: ['role'] })
    },

    getMe: async (_: User, _args: User, { req }:any) => {
      if (!req.userId) {
        return null
      }

      return await User.findOne(req.id, { relations: ['role'] })
    }

  },
  Mutation: {
    createUser: async (_: User, args: User) => {
      const { firstName, lastName, birthday, email, password } = args
      const hashedPassword = await bcrypt.hash(password, 10)
      try {
        const user = User.create({
          firstName,
          lastName,
          birthday,
          email,
          password: hashedPassword,
          createDate: Date()
        })
        await user.save()

        return true
      } catch (error) {
        return false
      }
    },
    deleteUser: async (_: User, args: User) => {
      const { id } = args
      try {
        await User.delete(id)
        return true
      } catch (error) {
        return false
      }
    },
    login: async (_ : any, { email, password } :any, { res } : any) => {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return null
      }

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        return null
      }

      const accessToken = sign(
        { userId: user.id, userMail: user.email },
        SECRET_KEY,
        {
          expiresIn: '30d'
        }
      )

      res.cookie('access-token', accessToken)

      return user
    }
  }
}
