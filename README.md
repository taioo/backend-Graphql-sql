## Set port & database

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



## APi examples:
```
mutation{
  createUser(
firstName: "john"
lastName: "doe"
birthday: "1900-01-01"
email:"john@test.com"
password:"password"
  ),
  createRole(
    name:"CEO"
  )
}
```
```
mutation{
  addRoleToUser(userId: 1,roleId: 1)
}
```
```
mutation{
login(email: "john@test.com", password: "password" ){
  id
  email
  firstName
}
}
```
```
{
  getMe{
    firstName
    lastName
    createDate
    password
    role{
      name
    }
  }
}
```
``` 
{
  getUser(id: 1){
    firstName
    lastName
    birthday
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
    birthday
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