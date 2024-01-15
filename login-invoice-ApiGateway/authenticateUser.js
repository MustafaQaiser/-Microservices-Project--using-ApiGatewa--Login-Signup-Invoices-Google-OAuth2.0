const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }
  jwt.verify(token.replace('Bearer ', ''), 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = decoded;
    console.log(decoded)
    next();
  });
};

module.exports = isAuthenticated;
