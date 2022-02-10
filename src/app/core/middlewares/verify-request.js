import jwt from 'jsonwebtoken';

export const verifyRequest = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken) {
    const token = bearerToken.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).send('Token is not valid!');
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send('You are not authenticated!');
  }
};
