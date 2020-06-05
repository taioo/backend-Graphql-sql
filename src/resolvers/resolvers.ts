/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import * as Moment from 'moment'

// Provide resolver functions for your schema fields
export const resolvers = {

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
