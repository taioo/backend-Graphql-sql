## Set port & database
- Create .env file and paste
```
PORT = 3333
```
- create database in postgres

Check ```ormconfig.js``` file to configure database name

</br>

# Instal & run
``` 
npm i
``` 
``` 
npm start
``` 
run with nodemon
```
npm run start:watch
```
run tests with jest
```
npm test
```
## Build and run
```
npm run build
```
```
npm run production
```
</br>

create the follow user in database
```
firstName: "john"
lastName: "doe"
age: 100
email:"john@test.com"
password:"password"
```
to get the token for the user john 
POST **localhost:3333/get-token?email=john@test.com&password=password**


## examples:
```
mutation{
  createUser(
firstName: "john"
lastName: "doe"
age: 100
email:"john@test.com"
password:"password"
  ),
  createRole(
    name:"CEO"
  )
}
```
On the GraphQL endpoint you have a tab called HTTP HEADERS. This is john doe token
```
{ "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AdGVzdC5jb20iLCJpZCI6MiwiaWF0IjoxNTkzNDUyNTc1fQ.mogtAsf4J6_9GMwTbQxICzb4Ex4PoJEYBsGUcjiWr9A"}
```

``` 
{
  getUser(id: 1){
    firstName
    lastName
    age
    id
    email,
    password,
    createDate
    role{
      id
      name
    }
  }
  
    getRole(id: 1){
    name
    addDate
    id
    user{
      id
      firstName
      createDate
    }
  }
}
```

``` 
mutation{
  deleteUser(id : 3)
  deleteRole(id : 3)
}
```

``` 
{
  getAllUsers{
    firstName
    lastName
    age
    id
    createDate
    email
    password
    role{
      id
      name
    }
  }
  
  getAllRoles{
    name
    id
    addDate
    user{
      id
    }
  }
  
}
```
```
mutation{
  addRoleToUser(userId: 1,roleId: 1)
}
```