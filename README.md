# 🤖 dhruvbot

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**dhruvbot** is a versatile, feature-rich Discord bot with moderation tools, comprehensive server logging, utility commands, fun reaction triggers, and media conversion — all built on a clean auto-loading slash command system designed to be easy to deploy and manage.

---

## ✨ Features

### ⚙️ Core System
- **Auto-loading Commands** — Slash commands are automatically discovered and loaded from the `commands/` directory; no manual registration needed.
- **One-command Deployment** — Register or update all slash commands instantly with `npm run deploy`.
- **Web Health Endpoint** — Responds to `GET /` with `"Bot is running"`, keeping the bot alive on free hosts like Render or Railway.
- **Secure Config** — All credentials managed via a `.env` file; nothing sensitive is hardcoded.

### 🎉 Fun / Reaction Triggers
- 🍅 **Tomato Trigger** — When a message receives 3 🍅 reactions, the bot fires back with `"Tomato!"`.
- 📠 **Truth Nuke Trigger** — When a message receives 3 `:true:` reactions, the bot drops `truth nuke.png`.

### 🛠️ Utility Commands
| Command | Description |
|---|---|
| `/avatar [user]` | Displays a user's profile picture |
| `/userinfo [user]` | Shows account info: creation date, join date, roles, and more |
| `/serverinfo` | Displays server details: owner, member count, creation date |
| `/roleinfo <role>` | Shows role details: member count, position, mentionable/hoisted status |

### 🛡️ Moderation Commands
| Command | Description |
|---|---|
| `/warn <user> [reason]` | Issues a warning to a user |
| `/warnings <user>` | Lists all warnings for a user |
| `/clearwarnings <user>` | Clears all warnings for a user |
| `/mute <user>` | Mutes a user |
| `/unmute <user>` | Unmutes a user |
| `/kick <user> [reason]` | Kicks a user from the server |
| `/ban <user> [reason]` | Bans a user from the server |

> ⚠️ All moderation actions are automatically logged to the server's designated log channel. The warning system uses lightweight local JSON storage.

### 🖼️ Media Tool
- **`/img2gif <image>`** — Converts a static image upload to a GIF. Automatically rejects non-images and existing GIFs.

### 📜 Server Logging
Automatically logs events to `#audit-logs` (falls back to `#server-logs`) using rich embeds. Tracked events include:

- Member join / leave
- Message edited — shows before/after content with a jump link
- Message deleted
- Channel created / deleted
- Role created / deleted

---

## 🚀 Quick Start

```bash
# 1. Clone and navigate to the project
git clone https://github.com/yourname/dhruvbot.git
cd dhruvbot

# 2. Install dependencies
npm install

# 3. Create and fill out your .env file (see below)
cp .env.example .env

# 4. Register slash commands with Discord
npm run deploy

# 5. Start the bot
npm start
```

---

## 🔑 Configuration & Environment Variables

Create a `.env` file in the root of the project. Never commit this file — it contains your bot token.

```env
# ==========================================
# dhruvbot — Environment Variables
# ==========================================

# 🤖 Discord Bot Token (Required)
# https://discord.com/developers/applications
DISCORD_TOKEN=your-discord-bot-token-here

# ⚙️ Application & Guild IDs (Required for deploy)
CLIENT_ID=your-bot-client-id-here
GUILD_ID=your-test-server-id-here   # Optional: omit to deploy commands globally
```

### Setup Notes

- **Token security** — Never share or commit your `DISCORD_TOKEN`.
- **Privileged Intents** — Enable **Message Content Intent** and **Server Members Intent** in your [Discord Developer Portal](https://discord.com/developers/applications) under your bot's settings. These are required for logging and message features to work.

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | [Node.js](https://nodejs.org/) |
| Discord Library | [Discord.js v14](https://discord.js.org/) |
| Storage | Local JSON (warnings & persistence) |
| Hosting | Any Node-compatible host (Render, Railway, etc.) |

---

## 📁 Project Structure

```
dhruvbot/
├── commands/         # Slash commands (auto-loaded)
├── events/           # Discord event handlers
├── data/             # JSON storage (warnings, etc.)
├── assets/           # Static assets (truth nuke.png, etc.)
├── index.js          # Bot entry point
├── deploy-commands.js
└── .env              # Your environment variables (not committed)
```

---

## 📄 License

This project is open source. Feel free to fork, modify, and build on it.
