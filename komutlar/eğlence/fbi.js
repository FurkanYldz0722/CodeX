const Discord = require("discord.js")


exports.run = async (client, message, args) => {
  
  const fbi = new Discord.MessageEmbed()
  .setColor("RED")
  .setImage("https://media.tenor.com/images/1ec1659fd1cdaaf72a9a5fa566f842d6/tenor.gif")
  .setTitle("FBİ!")
   .setThumbnail(client.user.avatarURL())
    .setFooter('Komutu Kullanan Kullanıcı' + message.author.tag, message.author.avatarURL())
  message.channel.send(fbi)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fbi'], 
  permLevel: 0
};
 
exports.help = {
  name: "fbi"
};///CODEX