/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { graphqlTestCall, createTestConn } from './util'
import { Connection } from 'typeorm'
import { User } from '../entity/User'

const CreateUserMutation = `
  mutation CreateUser($firstName: String!, $lastName: String!, $age: Int!, $email: String!, $password: String) {
    createUser(firstName: $firstName, lastName: $lastName, age: $age, email: $email, password: $password)
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
        password
        createDate
    }
  }
`

const DeleteUser = `
mutation DeleteUser ($id : Int!) {
  deleteUser(id: $id)
  }
`

let conn: Connection

beforeAll(async () => {
  conn = await createTestConn()
})

afterAll(async () => {
  await conn.close()
})

describe('User', () => {
  const testUser = { firstName: 'firstName', lastName: 'lastName', age: 100, email: 'email@testmail.com', password: 'password' }
  let dbUser: { id: number, firstName: string, lastName: string, age: number, email: string, password: string} | undefined

  it('create testUser and find testUser in db', async () => {
    const registerResponse = await graphqlTestCall(CreateUserMutation, {
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      age: testUser.age,
      email: testUser.email,
      password: testUser.password
    })
    expect(registerResponse).toEqual({ data: { createUser: true } })
    dbUser = await User.findOne({
      where: {
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        age: testUser.age,
        email: testUser.email,
        password: testUser.password
      }
    })
    expect(dbUser).toBeDefined()
  })

  it('getUser resolver', async () => {
    const registerResponse = await graphqlTestCall(GetUser, {
      id: dbUser!.id
    })
    expect(registerResponse.data!.getUser.id).toEqual(dbUser!.id)
  })

  it('delete testUser and check in db', async () => {
    const registerResponse = await graphqlTestCall(DeleteUser, {
      id: dbUser!.id
    })
    dbUser = await User.findOne({
      where: {
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        age: testUser.age,
        email: testUser.email
      }
    })
    expect(registerResponse).toEqual({ data: { deleteUser: true } })
    expect(dbUser).toBeUndefined()
  })
})
