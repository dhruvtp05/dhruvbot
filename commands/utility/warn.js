const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { logAction } = require('../helper/modlog'); 
const { addWarning } = require('../helper/warningStore');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warns a user via DM and announces it publicly')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to warn')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the warning')
        .setRequired(false)),

  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.reply({ content: '❌ You don’t have permission to warn users.', ephemeral: true });
    }

    if (!target || target.id === interaction.user.id) {
      return interaction.reply({ content: '❌ Invalid target.', ephemeral: true });
    }

    try {
      const dmEmbed = new EmbedBuilder()
        .setTitle(`⚠️ You have been warned`)
        .addFields(
          { name: 'Server', value: `${interaction.guild.name}`, inline: false },
          { name: 'Reason', value: reason, inline: false }
        )
        .setColor(0xFFA500)
        .setTimestamp();

      await target.send({ embeds: [dmEmbed] });
    } catch (err) {
      console.warn(`Failed to DM ${target.user.tag}:`, err.message);
    }

    addWarning(target.id, interaction.user.id, reason);
    await interaction.reply({
      content: `⚠️ ${target.user.tag} has been warned. Reason: ${reason}`
    
    });
    await logAction(interaction.guild, 'Warn', target.user, interaction.user, reason);

  }
};