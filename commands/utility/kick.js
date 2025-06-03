const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { logAction } = require('./modlog');


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
      return interaction.reply({ content: '❌ You do not have permission to kick members.', ephemeral: true });
    }

    if (!target || !target.kickable) {
      return interaction.reply({ content: '❌ Cannot kick this user.', ephemeral: true });
    }

    if (target.id === interaction.user.id) {
      return interaction.reply({ content: '❌ You cannot kick yourself.', ephemeral: true });
    }

    if (target.id === interaction.client.user.id) {
      return interaction.reply({ content: '❌ You cannot kick me.', ephemeral: true });
    }


    // Add role
    await target.kick({reason});
    await interaction.reply({ content: `🔇 ${target.user.tag} has been kicked.` });
    await logAction(interaction.guild, 'Kick', target.user, interaction.user, reason);

  },
};
