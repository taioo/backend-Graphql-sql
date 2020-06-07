/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { graphqlTestCall, createTestConn } from '.'
import { Connection } from 'typeorm'
import { User } from '../entity/User'

const CreateUserMutation = `
  mutation CreateUser($firstName: String!, $lastName: String!, $age: Int!, $email: String!) {
    createUser(firstName: $firstName, lastName: $lastName, age: $age, email: $email)
  }
`

const GetUser = `
query GetUser ($id : Int!) {
    getUser(id: $id){
        id
        firstName
        lastName
        age
        email
        createDate
    }
  }
`

let testUser: { id: number, firstName: string; lastName: string; age: number; email: string }
let registerResponse
let conn: Connection

beforeAll(async () => {
  conn = await createTestConn()
  testUser = { id: 1, firstName: 'firstName', lastName: 'lastName', age: 100, email: 'email@mail.com' }
})

afterAll(async () => {
  await conn.close()
})

describe('User resolvers', () => {
  test('set testUser in DB', async () => {
    const dbUser = await User.findOne({ where: { email: testUser.email } })
    expect(dbUser).toBeDefined()
  })

  it('createUser', async () => {
    registerResponse = await graphqlTestCall(CreateUserMutation, {
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      age: testUser.age,
      email: testUser.email
    })
    expect(registerResponse).toEqual({ data: { createUser: true } })
  })

  it('getUser', async () => {
    registerResponse = await graphqlTestCall(GetUser, {
      id: testUser.id
    })
    expect(registerResponse.data!.getUser.id).toEqual(1)
  })
})
