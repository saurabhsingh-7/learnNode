const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

const register = async (req, res) => {    
   try{
    const errors = validationResult(req);
if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            msg : 'Errors' ,
            errors: errors.array()
        })
    }

    const {name, email, mobile, password, image} = req.body;
    const isexist = await User.findOne({email});
    if(isexist){
        return res.status(400).json({
            success: false,
            message: 'User already exist'
        })
    }

     const hashpassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        mobile,
        password: hashpassword ,
        image : 'images/'+req.file.filename
    });
     const userData = await user.save();
     return res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: userData
    })
   } 
catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

 
module.exports = {
    register
}
