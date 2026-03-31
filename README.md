# 🤖 dhruvbot

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

dhruvbot is a versatile and feature-rich Discord bot equipped with moderation tools, extensive logging, utility commands, fun reaction triggers, and even media conversion tools. Built on a robust auto-loading slash command system, it is designed to be easy to deploy and manage.

---

## ✨ Features

* ⚙️ **Core System**
    * **Auto-loading Commands:** Slash commands are automatically loaded from the `commands/` directory.
    * **Easy Deployment:** Register and update slash commands instantly using `npm run deploy`.
    * **Web Health Endpoint:** Perfect for free hosts (like Render or Railway); responds on `/` with "Bot is running" to keep the bot awake.
    * **Environment Config:** Secure configuration managed via a `.env` file.
* 🎉 **Fun / Reactions**
    * 🍅 **Tomato Trigger:** If a message receives 3 🍅 reactions, the bot replies with "Tomato!".
    * 📠 **Truth Nuke Trigger:** If a message receives 3 `:true:` reactions, the bot replies with the `truth nuke.png` image.
* 🛠️ **Utility Commands**
    * `/avatar [user]`: Displays a user’s profile avatar.
    * `/userinfo [user]`: Shows user account and server info (created date, joined date, roles, etc.).
    * `/serverinfo`: Displays server details (owner, member count, created date).
    * `/roleinfo <role>`: Provides role details (members, mentionable/hoisted status, position, created date).
* 🛡️ **Moderation Commands**
    * **Warning System:** `/warn`, `/warnings`, `/clearwarnings` (fully backed by lightweight JSON storage).
    * **Mod Actions:** Basic actions including `/mute`, `/unmute`, `/kick`, and `/ban`.
    * *Note: All moderation actions are automatically logged to the server's designated log channel.*
* 🖼️ **Media Tool**
    * `/img2gif <image>`: Converts an uploaded *static* image to a GIF. Automatically rejects non-images and existing GIF inputs to ensure strict static-to-GIF conversion.
* 📜 **Logging (“useless stuff lol”)**
    * Automatically logs important server events to `#audit-logs` (or falls back to `#server-logs`) using rich embeds. Tracks:
        * Member join / leave
        * Message edited (displays before/after content + a jump link)
        * Message deleted
        * Channel created / deleted
        * Role created / deleted

---

🔑 Configuration & Environment Variables
The bot uses environment variables to keep your credentials secure. Create a .env file in the root directory of your project.

Here is an example of what your .env file should look like:

# ==========================================
# dhruvbot Environment Variables Example
# ==========================================

# 🤖 Discord Bot Token (Required)
# Get your token here: [https://discord.com/developers/applications](https://discord.com/developers/applications)
DISCORD_TOKEN=your-discord-bot-token-goes-here

# ⚙️ Deploy Variables
# Required for 'npm run deploy' to register slash commands
CLIENT_ID=your-bot-client-id
GUILD_ID=your-test-server-id  # Optional: Use if deploying commands to a specific guild instead of globally
Setup Notes:

Token: Never share your DISCORD_TOKEN.

Intents: Make sure you have the necessary Privileged Gateway Intents (Message Content, Server Members) enabled in your Discord Developer Portal for logging and message reading to work properly.

💻 Tech Stack
Runtime: Node.js
Library: Discord.js
Storage: Local JSON (for warnings and simple persistence)

## 🚀 Quick Start

Get up and running locally in just a few steps:

```bash
# Navigate to the bot directory
cd dhruvbot

# Install required dependencies
npm install

# Register slash commands to your Discord server
npm run deploy


# Start the bot
npm start
