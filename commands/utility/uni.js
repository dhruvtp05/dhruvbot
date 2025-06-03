const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const catImages = [

    'https://images.steamusercontent.com/ugc/2059886496680429311/8956AF40B32C7FAB1904296EEA0DC8F2E6098B8B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    'https://i.redd.it/r5njan3pu4p91.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUaXJ0Iwv7GayqtAnXh5M-1UT_QZs7jDRC_g&s',
    'https://preview.redd.it/2ck5kgyou4p91.jpg?width=883&format=pjpg&auto=webp&s=2d14b08578b3f48f80affb5a3be14452378fdaac',
    'https://preview.redd.it/movn6i1pu4p91.jpg?width=640&crop=smart&auto=webp&s=6c812401084fecf340e11774167fff17e9455c19',
    'https://static.wikia.nocookie.net/floppapedia-revamped/images/a/a4/Unico.jpg/revision/latest?cb=20221117214435',


];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uni')
    .setDescription('Posts a picture of Uni'),

  async execute(interaction) {
    const randomCat = catImages[Math.floor(Math.random() * catImages.length)];

     const embed = new EmbedBuilder()
      .setTitle('Here\'s Uni!')
      .setImage(randomCat)
      .setColor(0xffaec9)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
