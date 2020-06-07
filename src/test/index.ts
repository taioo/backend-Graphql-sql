/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { makeExecutableSchema } from 'graphql-tools'
import * as fs from 'fs'
import * as path from 'path'

import { resolvers } from '../resolvers/resolvers'
import { userResolvers } from '../resolvers/user.resolvers'
import { roleResolvers } from '../resolvers/role.resolvers'
import { graphql } from 'graphql'
import { createConnection } from 'typeorm'

const typeDefs = readFile('../typeDefs/user.gql')
const userDefs = readFile('../typeDefs/typeDefs.gql')
const roleDefs = readFile('../typeDefs/role.gql')

const schema = makeExecutableSchema({ typeDefs: [typeDefs, userDefs, roleDefs], resolvers: [resolvers, userResolvers, roleResolvers] })

export const createTestConn = async () => createConnection()

export const graphqlTestCall = async (
  query: any,
  variables?: any,
  userId?: number | string
) => {
  return graphql(
    schema,
    query,
    undefined,
    {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: () => {}
      }
    },
    variables
  )
}

function readFile (pathFile: string) {
  return fs.readFileSync(path.join(__dirname, pathFile), 'utf8').toString()
}
