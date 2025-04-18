// Importing required modules
const express = require('express');
const session = require('express-session');
const QRCode = require('qrcode'); // For generating QR codes
const app = express();

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'your_session_secret', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true for HTTPS
}));

// Simple route to generate QR Code
app.get('/generate-qr', (req, res) => {
    const sessionId = Math.floor(Math.random() * 1000000); // Generating a random session ID
    req.session.sessionId = sessionId; // Save session ID in the session
    const data = `http://localhost:3000/verify-pair-code?sessionId=${sessionId}`;

    // Generating QR code
    QRCode.toDataURL(data, (err, qrCodeUrl) => {
        if (err) {
            return res.status(500).send('Error generating QR Code.');
        }
        res.json({
            success: true,
            qrCodeUrl
        });
    });
});

// Route to verify pair code
app.post('/verify-pair-code', (req, res) => {
    const { pairCode } = req.body;
    
    if (req.session.sessionId) {
        // Simple pair code verification
        if (pairCode === req.session.sessionId.toString()) {
            return res.json({ success: true, message: 'Pair code verified successfully!' });
        }
        return res.status(400).json({ success: false, message: 'Invalid pair code!' });
    } else {
        return res.status(400).json({ success: false, message: 'Session not found.' });
    }
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
