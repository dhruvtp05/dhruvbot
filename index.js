const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { token } = require('./config.json');

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

client.cooldowns = new Collection();
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
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

	if (reaction.emoji.name !== '🍅') return;

	const messageId = reaction.message.id;

	if (tomatoedMessages.has(messageId)) return;

	if (reaction.count === 3) {
		tomatoedMessages.add(messageId);

		await reaction.message.channel.send({
			content: `🍅 Tomato!`,
			files: ['https://cdn.discordapp.com/attachments/1356782088048742561/1400979231651139654/bc6704c40b442e34639ff3a798a6d954.png?ex=688e9b15&is=688d4995&hm=e0bde55ffc5c3c19fc1e742a551abcfbccf3ae854c2d14b210fca1750860a843&']
		});
	}
});


client.login(token);