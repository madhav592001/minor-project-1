import User from "../models/userModel.js";

export const getNotes = (req,res) => {

    User.findOne({email:req.user.email}).then((user,err)=>{
        if(err){
            return res.status(400).json({
                message:"Something went wrong",
                error:err
            })
        }

        if(user.notes.length === 0){
            return res.staus(201).json({
                message:"no notes"
            })
        }

        return res.status(200).json({
            notes:user.notes,
            message:"notes fetched successfully"
        })
    })

} 