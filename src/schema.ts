import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'
import * as fs from 'fs'
import * as path from 'path'

const UserDefs = readGqlFile('/typeDefs/User.gql')

// https://www.apollographql.com/docs/apollo-server/api/graphql-tools/
export const schema = makeExecutableSchema({
  typeDefs: [UserDefs],
  resolvers
})

function readGqlFile (pathFile:string) {
  return gql`${fs.readFileSync(path.join(__dirname, pathFile), 'utf8').toString()}`
}
