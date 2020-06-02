``` 
npm i
``` 

create .env file and paste
```
PORT = 3333
```

to run
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


examples:
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
