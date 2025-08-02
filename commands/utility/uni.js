const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const catImages = [

    'https://images.steamusercontent.com/ugc/2059886496680429311/8956AF40B32C7FAB1904296EEA0DC8F2E6098B8B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    'https://i.redd.it/r5njan3pu4p91.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUaXJ0Iwv7GayqtAnXh5M-1UT_QZs7jDRC_g&s',
    'https://preview.redd.it/2ck5kgyou4p91.jpg?width=883&format=pjpg&auto=webp&s=2d14b08578b3f48f80affb5a3be14452378fdaac',
    'https://preview.redd.it/movn6i1pu4p91.jpg?width=640&crop=smart&auto=webp&s=6c812401084fecf340e11774167fff17e9455c19',
    'https://static.wikia.nocookie.net/floppapedia-revamped/images/a/a4/Unico.jpg/revision/latest?cb=20221117214435',
    'https://i.ytimg.com/vi/441WknFOshc/sddefault.jpg',
    'https://i.redd.it/what-cat-breed-is-uni-v0-qe8nfkr1d96a1.png?width=1344&format=png&auto=webp&s=2023ff761f167ce876a1cc685a39e53e321347ac',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDoXRSam-yMtHMdMzBaqCEQlxmXZtQ-WJCog&s',
    'https://pbs.twimg.com/media/F0Ux8mWaQAA8jNL?format=jpg&name=large',
    'https://media.tenor.com/TORSwIHWHBcAAAAe/uni-cat.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhh5STredX9DUV5BpT1BJJQ9W6oUyxgUi9zw&s',
    'https://static.wikia.nocookie.net/youtube/images/8/86/%E3%81%86%E3%81%AB%E3%81%86%E3%81%AB%E7%B5%B5%E6%97%A5%E8%A8%98.jpg/revision/latest?cb=20230519165452',
    'https://i.pinimg.com/736x/da/3b/9c/da3b9ccc0b3aac39b6566d4d8b1b74cb.jpg',
    'https://64.media.tumblr.com/2db2555a29d944a4c3d693454c0a2d2c/a409b9fe816c2968-2d/s1280x1920/bc380cd54cd4295bea1cf7cd6af34853b51de70f.jpg'




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
