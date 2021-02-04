const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embed = new Discord.MessageEmbed()
  .setColor('RED') 
  .setAuthor(`CODEX BOT`)
  .setDescription('**》𝐘𝐀𝐏𝐈𝐌𝐂𝐈𝐋𝐀𝐑𝐈𝐌《**', 
     `**》🇹🇷ＦＵＲＫＡＮ🇹🇷#1876《**
      **》𝐈𝐃《** <@318998310989987840>`)
  .setImage(`https://cdn.glitch.com/968f0b5b-2d9f-4c4f-9f55-fe3e443192cf%2F8ba0801e33f9e40369690d59d3960584.png?v=1611314705296`)
 .setThumbnail(client.user.avatarURL())
    .setFooter('Komutu Kullanan Kullanıcı ' + message.author.tag, message.author.avatarURL())
 
  message.channel.send(embed)
 


  const embed2 = new Discord.MessageEmbed()
  .setAuthor(`CODEX BOT`)
  .setColor("RED")
  .setDescription('**》𝐘𝐀𝐏𝐈𝐌𝐂𝐈𝐋𝐀𝐑𝐈𝐌《**', 
  `**》TioN#1401《** 
  **》𝐈𝐃《** <@382883493169987585>`)
  .setImage(`https://cdn.glitch.com/968f0b5b-2d9f-4c4f-9f55-fe3e443192cf%2F8ba0801e33f9e40369690d59d3960584.png?v=1611314705296`)
  .setThumbnail(client.user.avatarURL())
  .setFooter('Komutu Kullanan Kullanıcı ' + message.author.tag, message.author.avatarURL())
  message.channel.send(embed2)
  
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım'],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: 'Botun Yapımcısını Gösterir',
  usage: 'yapımcım'
};
