const { EmbedBuilder } = require('discord.js');

function getLogChannel(guild) {
  return guild.channels.cache.find(
    ch => (ch.name === 'audit-logs' || ch.name === 'server-logs') && ch.isTextBased()
  );
}

async function sendGuildLog(guild, { title, color = 0x5865f2, fields = [], footer = null }) {
  const channel = getLogChannel(guild);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setColor(color)
    .setTimestamp();

  if (fields.length) {
    embed.addFields(fields);
  }

  if (footer) {
    embed.setFooter({ text: footer });
  }

  await channel.send({ embeds: [embed] });
}

module.exports = {
  getLogChannel,
  sendGuildLog
};
