import {check,validationResult} from 'express-validator'

export const validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage("Valid email is required!!") ,
    
    check('password')
    .notEmpty()
    .withMessage('Password is required!!'),
]

export const validateSignupRequest = [
    
    check('email')
    .isEmail()
    .withMessage('Valid email is required!!') ,

    check('password')
    .notEmpty()
    .withMessage('Password is required!!'),

    check('full_name')
    .notEmpty()
    .withMessage('Full name is required!!'),

    check('user_name')
    .notEmpty()
    .withMessage('User name is required!!')

]


export const isRequestValidated = (req,res,next) => { 

    const errors = validationResult(req) ; 

    // console.log(errors.array()[0].msg)

    if(errors.array().length > 0 ){
        return res.status(210).json({
            msg: errors.array()[0].msg,
          });
    }

    next() ; 

}