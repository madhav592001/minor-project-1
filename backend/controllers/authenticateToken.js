import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.status(401).json({
      auth: false,
      message: 'no authorization',
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        auth: false,
        message: 'no access',
      });

    req.user = user; //* will give the payload back like we have given
    //* email in payload so it will return that object
    //* res.send(req.user.email) ;

    next();
  });
};
