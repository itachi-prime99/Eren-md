// routes/pairCode.js
const { validatePairCode } = require('../sessionManager');

// Function to verify the pair code entered by the user
function verifyPairCode(pairCode) {
  const isValid = validatePairCode(pairCode);  // Validate the entered pair code

  if (isValid) {
    return { success: true, message: 'Pair code verified successfully!' };
  } else {
    return { success: false, message: 'Invalid pair code. Please try again.' };
  }
}

module.exports = { verifyPairCode };
