# QR Code + Pair Code System

This is a simple **QR Code + Pair Code system** that allows users to scan a QR code and then enter a pair code to verify and establish a session. The system uses **Express.js** for the backend, and it generates QR codes with unique session IDs.

## Features
- **QR Code Generation**: Generates a QR code with a unique session ID.
- **Pair Code Verification**: Allows users to enter a pair code to verify the session.
- **Session Management**: Secure session management with session expiration.
- **Configurable**: Easy to configure session secrets, QR code data, and other settings.

## Installation

### Prerequisites
- **Node.js** (version >= 14.x)
- **npm** (Node Package Manager)

### Steps to Set Up

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/qr-pair-code-system.git
   cd qr-pair-code-system
