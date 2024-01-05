const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')

const verifyAuth = async(req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        res.status(501).json({
            success : false,
            err : "You need to login first!!"
        })
    }

    const token = authorization.split(' ')[1];

    try {
        const {id} = jwt.verify(token, process.env.SECRET);
        req.user = await userModel.findOne({_id : id});
        next();

    } catch (error) {
        res.status(501).json({
            success : false,
            err : error.message
        })
    }
}


module.exports = verifyAuth;