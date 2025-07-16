/**
 * Middleware to authenticate requests for the admin panel.
 * Checks for a valid JWT token in the Authorization header
 */
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Valid and decoded token at this point
    req.user = payload;
    next();
  } catch (err) {
    console.error('Invalid Google token:', err);
    return res.status(403).json({ message: 'Invalid token' });
  }
};
