/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { mainResolvers } from './resolvers/mainResolvers'
import { userResolvers } from './resolvers/user.resolvers'
import { roleResolvers } from './resolvers/role.resolvers'
import { verify } from 'jsonwebtoken'

import cookieParser = require('cookie-parser')
import fs = require('fs')
import path = require('path')
import express = require('express')

const mainDefs = readGqlFile('typeDefs/main.gql')
const userDefs = readGqlFile('typeDefs/user.gql')
const roleDefs = readGqlFile('typeDefs/role.gql')
const SECRET_KEY = process.env.SECRET_KEY || 'my8secret8key'

const app = express()
app.use(cookieParser())
app.use((req : any, _res, next) => {
  const accessToken = req.cookies['access-token']
  try {
    const decoded = verify(accessToken, SECRET_KEY) as any
    req.userId = decoded.userId
  } catch {}
  next()
})

const server = new ApolloServer({
  typeDefs: [mainDefs, userDefs, roleDefs],
  resolvers: [mainResolvers, userResolvers, roleResolvers],
  context: ({ req, res }: any) => ({ req, res }),
  tracing: true,
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  }
})

const startServer = async () => {
  await createConnection()
  server.applyMiddleware({ app })
  const port = process.env.PORT || 3333
  app.listen({ port: port }, () =>
    console.log(`🚀 running in ${process.env.NODE_ENV} mode \n Server ready at http://localhost:${port}${server.graphqlPath}`)
  )
}

startServer()

function readGqlFile (pathFile: string) {
  const query = fs.readFileSync(path.join(__dirname, pathFile), 'utf8').toString()
  return query
}
