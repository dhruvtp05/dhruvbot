const { SlashCommandBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const { logAction } = require('../helper/modlog');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to kick')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for kicking this user')
        .setRequired(false)),

  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';


    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.reply({ content: '❌ You do not have permission to kick members.', flags: MessageFlags.Ephemeral });
    }

    if (!target || !target.kickable) {
      return interaction.reply({ content: '❌ Cannot kick this user.', flags: MessageFlags.Ephemeral });
    }

    if (target.id === interaction.user.id) {
      return interaction.reply({ content: '❌ You cannot kick yourself.', flags: MessageFlags.Ephemeral });
    }

    if (target.id === interaction.client.user.id) {
      return interaction.reply({ content: '❌ You cannot kick me.', flags: MessageFlags.Ephemeral });
    }


    // Add role
    await target.kick({reason});
    await interaction.reply({ content: `🔇 ${target.user.tag} has been kicked.` });
    await logAction(interaction.guild, 'Kick', target.user, interaction.user, reason);

  },
};
