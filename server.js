const express = require('express');
const app = express();
const path = require('path');
const { exec } = require('child_process');

app.use(express.static(path.join(__dirname, 'public')));

// Start Bot Endpoint
app.get('/start', (req, res) => {
    exec('node goatbot.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.json({ message: `Error starting bot: ${stderr}` });
        }
        res.json({ message: 'Bot started successfully!' });
    });
});

// Stop Bot Endpoint
app.get('/stop', (req, res) => {
    exec('killall node', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.json({ message: `Error stopping bot: ${stderr}` });
        }
        res.json({ message: 'Bot stopped successfully!' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
