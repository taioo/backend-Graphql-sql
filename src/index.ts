import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { resolvers } from './resolvers/resolvers'
import { userResolvers } from './resolvers/user.resolvers'
import { roleResolvers } from './resolvers/role.resolvers'
import { loginResolvers } from './resolvers/login.resolvers'
import * as fs from 'fs'
import * as path from 'path'

const typeDefs = readGqlFile('typeDefs/user.gql')
const loginDefs = readGqlFile('typeDefs/login.gql')
const userDefs = readGqlFile('typeDefs/typeDefs.gql')
const roleDefs = readGqlFile('typeDefs/role.gql')

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: [typeDefs, userDefs, roleDefs, loginDefs],
    resolvers: [resolvers, userResolvers, roleResolvers, loginResolvers],
    tracing: true,
    playground: {
      settings: {
        'request.credentials': 'include'
      }
    }
  })

  await createConnection()

  const app = express()

  server.applyMiddleware({ app })
  const port = process.env.PORT || 3333
  app.listen({ port: port }, () =>
    console.log(`🚀 running in ${process.env.NODE_ENV} mode \n Server ready at http://localhost:${port}${server.graphqlPath}`)
  )
}

startServer()

function readGqlFile (pathFile:string) {
  const query = fs.readFileSync(path.join(__dirname, pathFile), 'utf8').toString()
  return query
}
