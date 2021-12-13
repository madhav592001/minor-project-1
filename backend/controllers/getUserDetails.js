import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const getUserDetails = (req,res) => {

    User.findOne({email:req.user.email}).exec((err,user)=>{
        if(err){
            return res.status(400).json({
                message:err
            })
        }
        if(user)
        {
            return res.status(200).json({
                user
            })
        }
    })
}
