const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('--- Auth Middleware Triggered ---');
  
  // 1. Log all headers to see if Authorization is present
  console.log('Request Headers:', req.headers);

  let token = req.header('Authorization');

  if (!token) {
    console.error('!!! ERROR: No Authorization header found.');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  console.log('Found Authorization header:', token);

  // Check for "Bearer " prefix and remove it if it exists
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
    console.log('Token after stripping "Bearer ":', token);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Log the decoded payload to see if it contains the user ID
    console.log('Token decoded successfully:', decoded);

    req.user = decoded; // req.user will be { id: '...', role: '...' }
    
    console.log('Attached user to request:', req.user);
    
    next();
  } catch (err) {
    // 4. Log the error if token verification fails
    console.error('!!! ERROR: Token verification failed.', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;