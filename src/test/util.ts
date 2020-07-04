/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { makeExecutableSchema } from 'graphql-tools'

import { mainResolvers } from '../resolvers/mainResolvers'
import { userResolvers } from '../resolvers/user.resolvers'
import { roleResolvers } from '../resolvers/role.resolvers'
import { graphql } from 'graphql'
import { createConnection } from 'typeorm'
import fs = require('fs')
import path = require('path')
const userDefs = readFile('../typeDefs/user.gql')
const mainDefs = readFile('../typeDefs/main.gql')
const roleDefs = readFile('../typeDefs/role.gql')

const schema = makeExecutableSchema({ typeDefs: [mainDefs, userDefs, roleDefs], resolvers: [mainResolvers, userResolvers, roleResolvers] })
const context = (userId : number | string) => {
  return ({
    req: { userId },
    res: { clearCookie: () => {} }
  })
}
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
    context(userId!),
    variables
  )
}

function readFile (pathFile: string) {
  return fs.readFileSync(path.join(__dirname, pathFile), 'utf8').toString()
}
