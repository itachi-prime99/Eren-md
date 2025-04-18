const express = require('express');
const session = require('express-session');
const QRCode = require('qrcode');
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true for HTTPS
}));

// Root route - Serve an HTML page
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>QR & Pair Code System</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #000;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .container {
                        text-align: center;
                    }
                    .btn {
                        background-color: #E91E63;
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        margin: 10px;
                        font-size: 18px;
                        cursor: pointer;
                        border-radius: 5px;
                    }
                    .btn:hover {
                        background-color: #C2185B;
                    }
                    .qr-container {
                        margin-top: 20px;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                    input {
                        padding: 10px;
                        font-size: 16px;
                        margin-top: 20px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                    }
                    .verify-btn {
                        background-color: #4CAF50;
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome to the QR and Pair Code System!</h1>
                    <button class="btn" onclick="generateQR()">Generate QR Code</button>
                    <div id="qrContainer" class="qr-container"></div>

                    <div>
                        <input type="text" id="pairCode" placeholder="Enter Pair Code" />
                        <button class="btn verify-btn" onclick="verifyPairCode()">Verify Pair Code</button>
                    </div>
                </div>
                <script>
                    function generateQR() {
                        fetch('/generate-qr')
                            .then(response => response.json())
                            .then(data => {
                                const qrContainer = document.getElementById('qrContainer');
                                qrContainer.innerHTML = `<img src="${data.qrCodeUrl}" alt="QR Code">`;
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }

                    function verifyPairCode() {
                        const pairCode = document.getElementById('pairCode').value;

                        fetch('/verify-pair-code', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ pairCode: pairCode }),
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    alert('Pair code verified successfully!');
                                } else {
                                    alert('Invalid pair code!');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }
                </script>
            </body>
        </html>
    `);
});

// Generate QR code
app.get('/generate-qr', (req, res) => {
    const sessionId = Math.floor(Math.random() * 1000000);
    req.session.sessionId = sessionId;
    const data = `http://localhost:3000/verify-pair-code?sessionId=${sessionId}`;

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

// Verify pair code
app.post('/verify-pair-code', (req, res) => {
    const { pairCode } = req.body;
    
    if (req.session.sessionId) {
        if (pairCode === req.session.sessionId.toString()) {
            return res.json({ success: true, message: 'Pair code verified successfully!' });
        }
        return res.status(400).json({ success: false, message: 'Invalid pair code!' });
    } else {
        return res.status(400).json({ success: false, message: 'Session not found.' });
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
