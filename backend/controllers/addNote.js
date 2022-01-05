import User from "../models/userModel.js"

export const addNote = (req,res) => {

    const note = {
        title:req.body.title,
        description:req.body.description,
    }

    try {
        
        User.findOneAndUpdate({email:req.user.email},{$push:{notes:note}}).then((response)=>{
            return res.status(200).json({
                message:"note added successfully!!",
                res:response
            })
        })

    } catch (error) {
        
        return res.status(201).json({
            message:"some error occured"
        })

    }

}
