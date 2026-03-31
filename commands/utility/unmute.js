const { SlashCommandBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const { logAction } = require('../helper/modlog');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmutes a user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to mute')
        .setRequired(true)),

  async execute(interaction) {
    const target = interaction.options.getMember('target');
    let muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
    const reason = interaction.options.getString('reason') || 'No reason provided';


    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.reply({ content: '❌ You do not have permission to unmute members.', flags: MessageFlags.Ephemeral });
    }

    if (!target || !target.manageable) {
      return interaction.reply({ content: '❌ Cannot unmute this user.', flags: MessageFlags.Ephemeral });
    }

    if (!muteRole || !target.roles.cache.has(muteRole.id)) {
      return interaction.reply({ content: '❌ That user is not muted.', flags: MessageFlags.Ephemeral });
    }

    // Add role
    await target.roles.remove(muteRole);
    await interaction.reply({ content: `🔇 ${target.user.tag} has been unmuted.` });
    await logAction(interaction.guild, 'Unmute', target.user, interaction.user, reason);

  },
};
