const userModel = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

const createUser = async(req, res)=>{
    try {
        const {name, email, phone, password} = req.body;

        
        if(!name, !email, !phone, !password){
            return res.status(401).json({
                success:false,
                error:"Bad Request"
            })
        }

        const data = await userModel.create({
            "name" : name,
            "email" : email,
            "phone" : phone,
            "password" : password
        })
        const token = generateToken(data._id);
        
        return res.status(201).json({
            success : true,
            token,
            data
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            err : error.message
        })
    }
}

const viewUser = async(req, res)=>{
    try {
        const data = await userModel.findById(req.params.id);
        return res.status(200).json({
            success : true,
            data
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            err : error.message
        })
    }
}

const updateUser = async(req, res)=>{
    try {
        const { id } = req.params;
        const { name, email, phone, password } = req.body
        const data = await userModel.updateOne({_id : id}, { name , email, phone , password });
        if(data.modifiedCount){
            return res.status(201).json({
                success : true,
                data
            })
        }
        return res.status(400).json({
            success : true,
            err : "data not updated"
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            err : error.message
        })
    }
}

const deleteUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await userModel.deleteOne({_id : id});

        if(data.deletedCount){
            return res.status(404).json({
                success : true,
                data
            })
        }
        return res.status(203).json({
            success : false,
            err : "data not found"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            err : error.message
        })
    }
}

const loginUser = async(req, res)=>{
   try {

    const {email, password} = req.body;

      
    if(!email, !password){
        return res.status(401).json({
            success:false,
            error:"Bad Request"
        })
    }

    const loginData = await userModel.findOne({email});

    if(loginData){
      
      
        if(loginData.password == password){
            const token = generateToken(loginData._id);
            const data={
                name:loginData.name,
                email:loginData.email,
                phone:loginData.phone
            }
            return res.status(200).json({
                success : true,
                data,
                token,
            })
        }
        else{
            res.status(404).json({
                status : false,
                err : "cridential not matched"
            })
        }
    }
    else{
        res.status(404).json({
            success : false,
            err : "email is wrong"
        })
    }
   } catch (error) {
   }
}


module.exports = {
    createUser,
    viewUser,
    updateUser,
    deleteUser,
    loginUser
}