// index.js
const express = require('express');
const path = require('path');
const { generateQRCode } = require('./routes/qrCode');
const { verifyPairCode } = require('./routes/pairCode');
const sessionManager = require('./sessionManager');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Home route to render the QR Code page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to generate QR Code
app.get('/generate-qr', (req, res) => {
  const qrCodeData = generateQRCode();
  res.json({ qrCodeData });
});

// Route to verify pair code
app.post('/verify-pair-code', express.json(), (req, res) => {
  const { pairCode } = req.body;
  const isVerified = verifyPairCode(pairCode);
  if (isVerified) {
    res.json({ success: true, message: 'Pairing successful!' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid pair code.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
