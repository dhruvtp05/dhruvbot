const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { clearWarnings } = require('./warningStore');
const { logAction } = require('./modlog');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearwarnings')
    .setDescription('Clears all warnings for a user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to clear warnings for')
        .setRequired(true)),

  async execute(interaction) {
    const target = interaction.options.getUser('target');

    // Only mods can use this
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.reply({
        content: '❌ You do not have permission to clear warnings.',
        ephemeral: true
      });
    }

    const success = clearWarnings(target.id);

    if (!success) {
      return interaction.reply({
        content: `✅ ${target.tag} has no warnings.`,
        ephemeral: true
      });
    }

    await interaction.reply({
      content: `🧹 Cleared all warnings for ${target.tag}.`,
    });

    // Log it
    if (typeof logAction === 'function') {
      await logAction(interaction.guild, 'ClearWarnings', target, interaction.user, 'Cleared by moderator');
    }
  }
};
