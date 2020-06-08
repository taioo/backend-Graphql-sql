## Set port & database
- Create .env file and paste
```
PORT = 3333
```
- Start and create database in postgres

Check ```ormconfig.json``` file to configure database name

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
## only if you want Build and run

change ```ormconfig.json``` to js files paths
```
  "entities": ["output/entity/**/*.js"],
  "migrations": ["output/migration/**/*.js"],
  "subscribers": ["output/subscriber/**/*.js"],
  "cli": {
    "entitiesDir": "output/entity",
    "migrationsDir": "output/migration",
    "subscribersDir": "output/subscriber"
```
build and run
```
npm run build
```
</br>

## examples:
```
mutation{
  createUser(
firstName: "john"
lastName: "doe"
age: 100
email:"john@test.com"
  ),
  createRole(
    name:"CEO"
  )
  
}
```

``` 
{
  getUser(id: 1){
    firstName
    lastName
    age
    id
    email
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