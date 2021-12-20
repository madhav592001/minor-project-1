import User from '../models/userModel.js';

export const userSignup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(201).json({
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
      return res.status(202).json({
        message: "passwords don't match",
      });
    }
  });
};
