// index.js
const { 
  Client, 
  GatewayIntentBits, 
  Collection, 
  Events, 
  Partials
} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is running"));
app.listen(PORT, () => console.log(`Web server listening on ${PORT}`));

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions
	],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const tomatoedMessages = new Set();
const truedMessages = new Set();

// Command collection
client.commands = new Collection();

// Read all command files (supports subfolders)
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  if (folder === 'helper') continue;

  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing "data" or "execute". Skipping.`);
    }
  }
}

// Load and register all event handlers from ./events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('messageReactionAdd', async (reaction, user) => {
	if (user.bot) return;

	try {
		if (reaction.partial) await reaction.fetch();
		if (reaction.message.partial) await reaction.message.fetch();
	} catch (err) {
		console.error('Failed to fetch partials:', err);
		return;
	}

	console.log(`Reaction added: ${reaction.emoji.name} by ${user.tag}`);


	const messageId = reaction.message.id;

	if (reaction.emoji.name === '🍅') {
		if (tomatoedMessages.has(messageId)) return;

		if (reaction.count === 3) {
			tomatoedMessages.add(messageId);

			await reaction.message.reply({
				content: '🍅 Tomato! https://ibb.co/RpRQ5xCM'
			});
		}
		return;
	}

	if (reaction.emoji.name === 'true') {
		if (truedMessages.has(messageId)) return;

		if (reaction.count === 3) {
			truedMessages.add(messageId);
			const trueImagePath = path.join(__dirname, 'images', 'truth nuke.png');

			await reaction.message.reply({
				files: [trueImagePath]
			});
		}
	}
});

if (!process.env.DISCORD_TOKEN) {
	console.error('Missing DISCORD_TOKEN in environment variables.');
	process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);
