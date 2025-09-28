const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getWarnings } = require('../helper/warningStore');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('View warnings for a user')
    .addUserOption(option =>
      option.setName('target').setDescription('User to view warnings for').setRequired(true)),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const warnings = getWarnings(target.id);

    if (warnings.length === 0) {
      return interaction.reply({ content: `✅ ${target.tag} has no warnings.`, ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle(`Warnings for ${target.tag}`)
      .setColor(0xffcc00)
      .setTimestamp();

    warnings.forEach((warn, i) => {
      embed.addFields({
        name: `#${i + 1} • ${new Date(warn.timestamp).toLocaleString()}`,
        value: `**Reason**: ${warn.reason}\n**Moderator**: <@${warn.moderator}>`,
        inline: false
      });
    });

    await interaction.reply({ embeds: [embed] });
  }
};
