const {check} = require('express-validator');

exports.registor_validator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    
    check('mobile', 'Mobile should be of 10 digits').isLength({
        min: 10,
        max: 10
    }),
    check('password', 'Password is of minimum 6 characters , contains atleast one number, one uppercase , one smaller case , and one special character').isStrongPassword(
        {
        minLength: 6,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1
        }
    ),
    check('image', 'Image should be of type jpeg or png').isMimeType(['image/jpeg', 'image/png'])   
];