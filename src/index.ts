import { createConnection } from 'typeorm'
import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema'

const startServer = async () => {
  const server = new ApolloServer({ schema })

  await createConnection()

  const app = express()

  server.applyMiddleware({ app })

  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  )
}

startServer()
