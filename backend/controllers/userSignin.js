import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const userSignin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {

    if (user) {
      if (user.authenticate(req.body.password)) {
        const user = { email: req.body.email }; //* payload

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '3h',
        });

        return res.status(200).json({
          jwt_token: accessToken,
          message: 'login successfully',
        });
      } else {
        return res.status(401).json({
          message: 'Wrong password!!',
        });
      }
    } else {
      return res.status(400).json({
        message: 'not registered!! register first',
      });
    }
  });
};
