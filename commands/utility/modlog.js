const { EmbedBuilder } = require('discord.js');

async function logAction(guild, action, user, moderator, reason) {
  const channel = guild.channels.cache.find(ch => ch.name === 'audit-logs' && ch.isTextBased());

  if (!channel) {
    console.warn(`Mod log channel not found in ${guild.name}`);
    return;
  }

  const embed = new EmbedBuilder()
    .setTitle(`🔧 ${action}`)
    .addFields(
      { name: 'User', value: `${user.tag} (${user.id})`, inline: true },
      { name: 'Moderator', value: `${moderator.tag}`, inline: true },
      { name: 'Reason', value: reason || 'No reason provided', inline: false }
    )
    .setColor(0xff0000)
    .setTimestamp();

  try {
    await channel.send({ embeds: [embed] });
  } catch (err) {
    console.error('Failed to send mod log:', err);
  }
}

module.exports = { logAction };