const jwt = require('jsonwebtoken')

const token = "eyJhbGciOiJIUzI1NiJ9.WW9nZXNo.d0z5SEghESddwtjFluQu9u21HKdrBBJqGFpoar8qENM"

console.log(typeof(jwt.verify(token, "123")))

