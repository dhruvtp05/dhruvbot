const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { logAction } = require('../helper/modlog');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutes a user for a certain duration')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to mute')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Mute duration in minutes')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for muting this user')
        .setRequired(false)),

  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || `Muted for ${duration} minute(s)`;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.reply({ content: '❌ You do not have permission to mute members.', ephemeral: true });
    }

    if (!target || !target.manageable) {
      return interaction.reply({ content: '❌ Cannot mute this user.', ephemeral: true });
    }

    let muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

    // Add role
    await target.roles.add(muteRole);
    await interaction.reply({ content: `🔇 ${target.user.tag} has been muted for ${duration} minute(s).` });
    await logAction(interaction.guild, 'Mute', target.user, interaction.user, reason);


    // Unmute after time
    setTimeout(async () => {
      if (target.roles.cache.has(muteRole.id)) {
        try {
          await target.roles.remove(muteRole);
          await interaction.followUp({ content: `✅ ${target.user.tag} has been unmuted.` });
          
        } catch (err) {
          console.error('Failed to unmute:', err);
        }
      }
    }, duration * 60 * 1000); // Convert minutes to ms
  },
};
