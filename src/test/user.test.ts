/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { graphqlTestCall, createTestConn } from './util'
import { Connection } from 'typeorm'
import { User } from '../entity/User'

const CreateUserMutation = `
  mutation CreateUser($firstName: String!, $lastName: String!, $birthday: Date!, $email: String!, $password: String) {
    createUser(firstName: $firstName, lastName: $lastName, birthday: $birthday, email: $email, password: $password)
  }
`

const GetUser = `
query GetUser ($id : Int!) {
    getUser(id: $id){
        id
        firstName
        lastName
        birthday
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
  const testUser = { firstName: 'firstName', lastName: 'lastName', birthday: new Date(), email: 'email@testmail.com', password: 'password' }
  let dbUser: User | undefined

  it('create testUser and find testUser in db', async () => {
    const registerResponse = await graphqlTestCall(CreateUserMutation, {
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      birthday: testUser.birthday,
      email: testUser.email,
      password: testUser.password
    })
    expect(registerResponse).toEqual({ data: { createUser: true } })
    dbUser = await User.findOne({
      where: {
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        email: testUser.email
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
        birthday: testUser.birthday,
        email: testUser.email
      }
    })
    expect(registerResponse).toEqual({ data: { deleteUser: true } })
    expect(dbUser).toBeUndefined()
  })
})
