// index.js
const { 
  Client, 
  GatewayIntentBits, 
  Collection, 
  Events, 
  REST, 
  Routes 
} = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions
	],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const tomatoedMessages = new Set();

// Command collection
client.commands = new Collection();
const commands = [];

// Read all command files (supports subfolders)
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing "data" or "execute". Skipping.`);
    }
  }
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

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


	if (reaction.emoji.name !== '🍅') return;

	const messageId = reaction.message.id;

	if (tomatoedMessages.has(messageId)) return;

	if (reaction.count === 3) {
		tomatoedMessages.add(messageId);

		await reaction.message.reply({
			content: `🍅 Tomato!`,
			files: ['https://ibb.co/RpRQ5xCM']
		});
	}
});

client.on('ready', () => {
	console.log('Bot is ready and watching reactions.');
});


client.login(token);
