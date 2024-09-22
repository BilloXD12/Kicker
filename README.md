# Discord Bot - Kick Users from Second Server if not in Main Server

This Discord bot checks if a user is in the main server when they join or leave the second server. If the user is not in the main server, the bot will send a DM notifying them that they will be kicked, and then kick them from the second server. It also retains memory across bot restarts.

## Features

- Automatically checks if a user is in the main server when they join or leave the second server.
- Sends a DM before kicking a user who isn't in the main server.
- Retains state across bot restarts using JSON file storage.
- Customizable embed message, with options to include images and footers.

## Requirements

- Node.js v16 or higher
- A Discord bot token
- Two Discord servers (Main Server and Second Server)
- `discord.js` library

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
