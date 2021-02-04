const Discord = require('discord.js');
const data = require('quick.db');


exports.run = async (client, message, args) => {
if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
.setTitle('**`Mesajları Yönet` İzni sende yok.**'));
if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
.setTitle('Silinecek miktar giriniz.'));
if(args[0] > 100) return message.channel.send(new Discord.MessageEmbed()
.setTitle('Mesaj Silme Limitim `100` Üzeri Mesajı Aynı Anda Silemem.'));
message.channel.bulkDelete(args[0])
 return message.channel.send(new Discord.MessageEmbed()
.setTitle('<a:onay:802166173138550874> İşte Bu Kadar! '+`${args[0]}`+' Adet Mesaj Silindi <a:onay:802166173138550874>')).then(m => m.delete({timeout: 5000}));
};
exports.conf = {
  aliases: ["temizle", "c", "clear"]
};

exports.help = {
  name: "sil"
};