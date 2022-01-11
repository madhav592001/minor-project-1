import User from '../models/userModel.js';

export const updateNote = (req, res) => {
  try {
    User.updateOne(
      {email:req.user.email,'notes._id': req.params.id },
      {
        $set: {
          'notes.$.title': req.body.title,
          'notes.$.description': req.body.description,
        },
      }
    ).then((note) => {
      res.status(200).json({
        message:"Note updated Successfully"
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(210).json({
      message: 'Error Occured',
      error,
    });
  }
};
