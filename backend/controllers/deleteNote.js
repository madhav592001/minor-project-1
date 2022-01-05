import User from "../models/userModel.js";

export const deleteNote = (req,res) => {

    User.findOne({email:req.user.email}).exec((err,user)=>{
        
        if(err){
            return res.status(210).json({
                message:"Some error Occured",
                err
            })
        }

        if(user){

            try {
                user.notes.remove({_id:req.params.id}) ;

                user.save().then((user)=>{
                    return res.status(200).json({
                        message:"Notes deleted successfully",
                        user
                    })
                }) ;
            } catch (error) {
                console.log(error)
                return res.status(210).json({
                    message:"Error Occured",
                    error
                })
            }   

        }

    })

}