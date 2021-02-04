const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  const nn = new Discord.MessageEmbed().setThumbnail();
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(nn.setImage('https://media.giphy.com/media/Y41ynggo39awUmeg70/giphy.gif').setTitle(`Bir Hata Oldu!`).setThumbnail(message.author.avatarURL({dynamic: true})).setDescription(`**•** \`${client.ayarlar.prefix}yetkili-rol-ayarla\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`)).then(a => a.delete({timeout: 10000}));
if(!args[0]) return message.channel.send(nn.setTitle('Bir hata oldu!').setColor('#000001').setDescription(`Bir Rol Etiketlemeyi Unuttunuz.`)).then(a => a.delete({timeout: 10000}));
let role = message.mentions.roles.first();
if(!role) return message.channel.send(nn.setTitle('Bir hata oldu!').setColor('#000001').setDescription(`Bir Rol Etiketlemeyi Unuttunuz.`)).then(a => a.delete({timeout: 10000}));

data.set(`yetkili.${message.guild.id}`, role.id);
message.channel.send(nn.setTitle(`İşte Bu Kadar!`).setDescription(`Kayıt Yetkilisi İçin Kullanılacak : ${role} Rol Olarak Seçtiniz.`))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'yetkili-rol-ayarla'
};