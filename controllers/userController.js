const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

const mailer = require('../helpers/mailer');

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

     const msg = '<p> hi , '+name+' , Please <a href = "http://localhost:3000/mail-verification?id='+userData._id+'"> verify</a> your mail </p>';
     const subject = "Welcome to our website";
     mailer.sendMail(email, 'Mail Verification', msg);
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
