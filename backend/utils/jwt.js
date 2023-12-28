const jwt = require("jsonwebtoken")
const { jwtKey } = require("./config")


const generateToken = (user) => {
    
    const token = jwt.sign({ data: String(user)}, jwtKey, {expiresIn: '10m'});
    return token;

}



const verifyToken=(token)=>{
try {
const data=jwt.verify(token,jwtKey);
  
return data

} catch (error) {
    
    return false

}

}

module.exports = {
    generateToken,
    verifyToken
}