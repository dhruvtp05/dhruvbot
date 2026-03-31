const { Events } = require('discord.js');
const { sendGuildLog } = require('../commands/helper/serverLogger');

module.exports = {
  name: Events.MessageDelete,
  async execute(message) {
    if (!message.guild || message.author?.bot) return;

    try {
      if (message.partial) {
        await message.fetch();
      }
    } catch {
      return;
    }

    const content = message.content?.trim() || '(no text content)';

    try {
      await sendGuildLog(message.guild, {
        title: '🗑️ Message Deleted',
        color: 0xe67e22,
        fields: [
          { name: 'Author', value: `${message.author.tag} (${message.author.id})`, inline: false },
          { name: 'Channel', value: `${message.channel}`, inline: true },
          { name: 'Message ID', value: message.id, inline: true },
          { name: 'Content', value: content.slice(0, 1024), inline: false }
        ]
      });
    } catch (error) {
      console.error('Failed to log message delete:', error);
    }
  }
};
