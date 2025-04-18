const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

let isBotRunning = false;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Start Bot endpoint
app.get('/start', (req, res) => {
  isBotRunning = true;
  res.json({ status: 'Bot started', running: isBotRunning });
});

// Stop Bot endpoint
app.get('/stop', (req, res) => {
  isBotRunning = false;
  res.json({ status: 'Bot stopped', running: isBotRunning });
});

// Bot status endpoint
app.get('/status', (req, res) => {
  res.json({ running: isBotRunning });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
