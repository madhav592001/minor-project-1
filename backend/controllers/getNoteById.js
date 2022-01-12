import User from "../models/userModel.js";

export const  getNoteById = (req,res) => { 

    try {

        User.findOne({email:req.user.email},{notes: {$elemMatch: {"_id":req.params.id}}}).then(async(response)=>{        

            const note = response.notes[0] ; 

            return res.status(200).json({
                note
            }) 
        })

    } catch (error) {
        console.log(error) ; 
        return res.status(202).json({
            error
        })
    }

}