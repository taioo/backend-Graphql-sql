npx nodemon --watch

npx jest --watch

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
