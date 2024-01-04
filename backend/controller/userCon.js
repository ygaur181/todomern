const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id)=>{
    const token = jwt.sign({id}, process.env.SECRET);
    return token;
}

// SignUp User
const createUser = async(req, res)=>{
    try {
        const {email, password, confirm} = req.body;
        
        if(!email, !password, !confirm){
            throw Error("Fill all the fields")
        }

        if(!validator.isEmail(email)){
            throw Error("Enter right email")
        }

        if(!validator.isStrongPassword(password)){
            throw Error("Enter a strong password");
        }

        if(password != confirm){
            throw Error("Password and Confirm Password not matched")
        }

        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password, salt);

        const dataObj = {
            "email" : email,
            "password" : newPass
        }

        const data = await userModel.create(dataObj);
        const token = createToken(data._id);
        
        return res.status(201).json({
            success : true,
            email,
            token
        })

    } catch (error) {
        return res.status(501).json({
            success : false,
            err : error.message
        })
    }
}


// login User 
const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
    
        
        if(!email, !password){
            throw Error("Fill all the fields")
        }
 
        const loginData = await userModel.findOne({email});
    
        if(loginData){
            const isValid = await bcrypt.compare(password, loginData.password)
            if(isValid){
                const token = createToken(loginData._id);
                res.status(200).json({
                    success : true,
                    email,
                    token
                })
            }
            else{
                throw Error("Cridentials are not correct");
            }
        }
        else{
            throw Error("Cridentials are not correct");
        }
        
    } catch (error) {
        res.status(501).json({
            success : false,
            err : error.message
        })
    }
}


//under construction

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


module.exports = {
    createUser,
    viewUser,
    updateUser,
    deleteUser,
    loginUser
}