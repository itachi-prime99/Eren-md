const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { exec } = require('child_process');

// Create a new client
const client = new Client();

// Initialize Express for optional web dashboard
const app = express();
const port = 3000;

// Command handling
const commands = {};

// Load commands dynamically from the 'commands' folder
fs.readdirSync('./commands').forEach(file => {
    if (file.endsWith('.js')) {
        const command = require(`./commands/${file}`);
        commands[command.name] = command;
    }
});

// Log the bot in
client.on('ready', () => {
    console.log('Bot is ready!');
});

// Handle incoming messages
client.on('message', async (message) => {
    if (message.body.startsWith('/cmd')) {
        const command = message.body.slice(5).trim();
        
        if (commands[command]) {
            try {
                await commands[command].execute(message);
            } catch (error) {
                message.reply('An error occurred while processing your command.');
            }
        } else {
            message.reply('Unknown command. Please try again.');
        }
    }
});

// Listen for messages in group chats only
client.on('message_create', async (message) => {
    if (message.from.startsWith('group')) {
        if (message.body.startsWith('/cmd')) {
            const command = message.body.slice(5).trim();

            if (commands[command]) {
                try {
                    await commands[command].execute(message);
                } catch (error) {
                    message.reply('An error occurred while processing your command.');
                }
            } else {
                message.reply('Unknown command.');
            }
        }
    }
});

// Command to install a new command dynamically
const installCommand = async (message) => {
    if (message.hasQuotedMsg) {
        const quotedMessage = await message.getQuotedMessage();
        const file = quotedMessage.body;

        if (file.endsWith('.js')) {
            const commandPath = path.join(__dirname, 'commands', file);

            fs.writeFile(commandPath, file, (err) => {
                if (err) {
                    message.reply('Failed to install the command.');
                } else {
                    message.reply('Command installed successfully!');
                    // Dynamically load the new command
                    const newCommand = require(commandPath);
                    commands[newCommand.name] = newCommand;
                }
            });
        } else {
            message.reply('Please send a valid `.js` file.');
        }
    } else {
        message.reply('Please quote a `.js` file to install.');
    }
};

// Serve the bot on a web server (optional)
app.get('/', (req, res) => {
    res.send('Goat Bot is running!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Initialize the WhatsApp client
client.initialize();
