import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { resolvers } from './resolvers'
import * as fs from 'fs'
import * as path from 'path'

const UserDefs = reaGqlFile('/typeDefs/User.gql')

const startServer = async () => {
  const server = new ApolloServer({ typeDefs: [UserDefs], resolvers })

  await createConnection()

  const app = express()

  server.applyMiddleware({ app })

  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  )
}

startServer()

function reaGqlFile (pathFile:string) {
  return fs.readFileSync(path.join(__dirname, pathFile), 'utf8').toString()
}
