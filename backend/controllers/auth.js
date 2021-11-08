import User from '../models/userModel.js';
import jwt from 'jsonwebtoken' ; 

const userSignup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        message: 'User already exist',
      });
    }

    if (req.body.password === req.body.confirm_password) {
      const new_user = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        user_name: req.body.user_name,
      });

      try {
        new_user.save().then((data) => {
          return res.status(200).json({
            message: 'User created',
            data,
          });
        });
      } catch (error) {
        return res.status(400).json({
          err: error,
        });
      }
    }
    if (req.body.password !== req.body.confirm_password) {
      return res.status(400).json({
        message: "passwords don't match",
      });
    }
  });
};

const userSignin = (req, res) => {

  User.findOne({email:req.body.email}).exec((error,user)=>{

    if(error){
      return res.status(400).json({
        err:error
      })
    }

    if(user)
    {
      if(user.authenticate(req.body.password))
      {
        const user = { email:req.body.email }                     //* payload

        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
          expiresIn:"3h"
        }) ; 

        return res.status(200).json({
          jwt_token:accessToken,
          message:"login successfully"
        })
      }else{
        return res.status(401).json({
          message:"Wrong password!!"
        })
      }
    } 
    
    else{
      return res.status(400).json({
        message:"not registered!! register first"
      })
    }
    
  })

};

const authenticateToken = (req,res,next) => {

  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1] ; 

  if(token == null) return res.status(401).json({
    message:"no authorization"
  })

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) return res.status(403).json({
      message:"no access"
    })

    req.user = user               //* will give the payload back like we have given email in payload so it will return that object

    //* res.send(req.user.email) ; 

    next() ; 
  })

}

export { userSignup, userSignin , authenticateToken };
