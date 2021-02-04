const Discord = require('discord.js');


exports.run = function(client, message, embed, params) {
 const mesaj = new Discord.MessageEmbed()

  .setColor('RED')
  .setDescription("Pingim" + client.ws.ping)
  .setThumbnail(client.user.avatarURL())
  .setFooter('Komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
    message.channel.send(mesaj);

};   
  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['p', 'ms'],
  permLevel: 0 
};

exports.help = {
  name: 'ping', 
  description: 'Botun pingini gösterir',
  usage: 'ping'
};