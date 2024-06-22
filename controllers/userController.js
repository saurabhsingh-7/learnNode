const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {    
   try{
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
