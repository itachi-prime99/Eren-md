// sessionManager.js
const session = require('express-session');
const config = require('./config');
const crypto = require('crypto');

// Middleware to set up session management
const sessionMiddleware = session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: config.sessionDuration * 1000 },  // Convert to milliseconds
});

// Function to create a new session and generate a pair code
function createSession() {
  const sessionId = crypto.randomBytes(16).toString('hex');  // Unique session ID
  return sessionId;
}

// Function to validate the pair code entered by the user
function validatePairCode(pairCode) {
  // In a real-world application, this would be a secure verification mechanism
  // For now, we will simulate the validation with a hardcoded pair code.
  const validPairCode = '123456'; // Example pair code
  return pairCode === validPairCode;
}

module.exports = {
  sessionMiddleware,
  createSession,
  validatePairCode,
};
