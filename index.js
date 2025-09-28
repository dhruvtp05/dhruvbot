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

// Create the bot client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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

// On ready: deploy commands + log in
client.once(Events.ClientReady, async c => {
  console.log(`✅ Ready! Logged in as ${c.user.tag}`);

  // Deploy commands on startup (guild-based for instant updates)
  try {
    const rest = new REST({ version: '10' }).setToken(token);
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );
    console.log(`🔗 Successfully deployed ${commands.length} commands.`);
  } catch (error) {
    console.error('❌ Failed to deploy commands:', error);
  }
});

// Handle interactions
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ 
        content: '❌ There was an error while executing this command!', 
        ephemeral: true 
      });
    } else {
      await interaction.reply({ 
        content: '❌ There was an error while executing this command!', 
        ephemeral: true 
      });
    }
  }
});

client.login(token);
