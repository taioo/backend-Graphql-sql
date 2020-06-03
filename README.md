## Set port & database
- Create .env file and paste
```
PORT = 3333
```
- Start and create database in postgres

Check ```.ormconfig``` file to configure database name

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
</br>

## examples:
```
mutation{
  addUser(
firstName: "john"
lastName: "doe"
age: 100
email:"bob@test.com"
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
  }
}
}
```

``` 
mutation{
  deleteUser(id : 1)
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
  }
}
```
