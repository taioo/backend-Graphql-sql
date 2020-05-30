/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

dotenv.config()

if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] , hello: String}
  type Book { title: String, author: String }
`
// The resolvers
const resolvers = {
  Query: { hello: () => 'Hello World!', books: () => books }
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const app = express()
// The GraphQL endpoint
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => {
    return {
      schema: schema,
      context: {
        value: req
      }
      // other options here
    }
  })
)

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT, () => { console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`) })
