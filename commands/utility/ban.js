const { SlashCommandBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const { logAction } = require('../helper/modlog');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to ban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for banning this user')
        .setRequired(false)),

  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';


    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.reply({ content: '❌ You do not have permission to ban members.', flags: MessageFlags.Ephemeral });
    }

    if (!target || !target.bannable) {
      return interaction.reply({ content: '❌ Cannot ban this user.', flags: MessageFlags.Ephemeral });
    }

    if (target.id === interaction.user.id) {
      return interaction.reply({ content: '❌ You cannot ban yourself.', flags: MessageFlags.Ephemeral });
    }

    if (target.id === interaction.client.user.id) {
      return interaction.reply({ content: '❌ You cannot ban me.', flags: MessageFlags.Ephemeral });
    }


    // Add role
    await target.ban({reason});
    await interaction.reply({ content: `🔇 ${target.user.tag} has been banned.` });
    await logAction(interaction.guild, 'Ban', target.user, interaction.user, reason);

  },
};
