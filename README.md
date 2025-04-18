# WhatsApp Goat Bot

## Description

A WhatsApp bot built with **whatsapp-web.js** for automating tasks, handling group commands, and installing new commands dynamically. This bot is designed to allow command execution in group chats and the ability to install new commands by quoting `.js` files.

## Features

- **Command Handling**: Process various commands like `/cmd install` to install new commands.
- **Group Support**: Commands can be executed in group chats.
- **Dynamic Command Installation**: Add new commands by quoting `.js` files in the chat.
- **Uptime Command**: Displays the bot's uptime.
- **Command Reload**: Reload commands without restarting the bot.

## Installation

### Prerequisites

1. **Node.js** (Version 12 or above)
2. **whatsapp-web.js**: For WhatsApp Web API.
3. **Express**: Optional, for any web-based dashboard.
4. **MongoDB**: For storing persistent data (optional depending on your setup).

### Steps to Setup

1. **Clone the Repository**:
   ```bash
   git clone your repo link
   cd your-repository-folder
   npm install
