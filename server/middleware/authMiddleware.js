const jwt = require('jsonwebtoken');
const secret = 'nTHDrGp7yz7PRYyULqGN5HS1Q9DnUZv6'; 

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error('Error verifying JWT:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
