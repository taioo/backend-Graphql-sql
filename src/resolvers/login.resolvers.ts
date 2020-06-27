/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { User } from '../entity/User'

const errorResponse = [
  {
    path: 'email',
    message: 'invalid Login'
  }
]

// Provide resolver functions for your schema fields
export const loginResolvers = {
  Mutation: {

    login: async (_: any, { email, password }: IRegisterOnMutationArguments) => {
      const user = await User.findOne({ where: { email } })

      if (!user || user.password !== password) {
        return errorResponse
      }
      return true
    }

  }
}

interface IRegisterOnMutationArguments {
  email: string;
  password: string
}
