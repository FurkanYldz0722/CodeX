const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
const nn = new Discord.MessageEmbed().setThumbnail();
if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(nn.setImage('https://media.giphy.com/media/Y41ynggo39awUmeg70/giphy.gif').setTitle(`Bir Hata Oldu!`).setThumbnail(message.author.avatarURL({dynamic: true})).setDescription(`**•** \`${client.ayarlar.prefix}erkek-rol-sıfırla\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`)).then(a => a.delete({timeout: 10000}));

data.delete(`erkek.${message.guild.id}`);
message.channel.send(nn.setTitle(`İşte Bu Kadar!`).setDescription(`Ayarlanmış Erkek Rolü Başarıyla Sıfırlandı.`))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'erkek-rol-sıfırla'
};