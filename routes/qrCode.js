// routes/qrCode.js
const QRCode = require('qrcode');
const { createSession } = require('../sessionManager');
const config = require('../config');

// Function to generate QR code for session
function generateQRCode() {
  const sessionId = createSession();  // Create a unique session ID
  const qrCodeData = `${config.qrCodeData}?sessionId=${sessionId}`;  // QR code data including session ID

  // Generate QR code and return it
  QRCode.toDataURL(qrCodeData, (err, url) => {
    if (err) {
      console.error('Error generating QR code:', err);
      return null;
    }
    return url;
  });
}

module.exports = { generateQRCode };
