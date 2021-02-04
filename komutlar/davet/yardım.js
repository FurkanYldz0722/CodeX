
const db = require("quick.db");
const Discord = require('discord.js');
const ayarlar = require("../../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix 
let eklenti = new Discord.MessageEmbed()  
.setColor('#ffd100') 
.setAuthor(`CodeX Davet Sistemi`, client.user.avatarURL())
.setDescription(`CodeX botumuzu eklemek için \`${prefix}davet\` yazabilirsiniz.`)
.addField(`__Davet Kanal__`,` \`${prefix}davet-kanal\` Sunucunuzda Kaç Kişinin Ne Kadar Daveti Olduğunu Gösteren Kanalı Ayarlar`,true)
.addField(`__Kanal Sıfırla__`,` \`${prefix}davet-kanal-sıfırla\` Sunucunuzda Kaç Kişinin Ne Kadar Daveti Olduğunu Gösteren Kanalı Sıfırlar`,true)
.addField(`__Davet Ekle__`,` \`${prefix}davet-ekle\` Etiketlediğiniz Kişinin Davet Sayısını Arttırır`,true)
.addField(`__Davetlerim__`,` \`${prefix}davetlerim\` Sunucuda Kaç Davetiniz Olduğunu Gösterir`,true)
.addField(`__Davet Rütbe Ekle__`,` \`${prefix}rütbe-ekle\` Sunucunuzda Davet Sayısına Göre Rol Verme Sistemine Rol Ekler`,true)
.addField(`__Rütbe Sil__`,` \`${prefix}rütbe-sil\` Sunucunuzda Davet Sayısına Göre Rol Verme Sisteminden Rol Siler`,true)
.setThumbnail(client.user.avatarURL())
.setFooter('Komutu Kullanan Kullanıcı' + message.author.tag, message.author.avatarURL())
.setImage(``)
.setThumbnail(client.user.avatarURL)
 message.channel.send(eklenti) 
  };
exports.conf = {
  aliases: []
  };
exports.help = {
  name: 'davetsistemi'
 };
