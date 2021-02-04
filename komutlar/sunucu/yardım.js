
const db = require("quick.db");
const Discord = require('discord.js');
const ayarlar = require("../../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix 
let eklenti = new Discord.MessageEmbed()  
.setColor('#ffd100') 
.setAuthor(`CodeX Sunucu Komutları `, client.user.avatarURL())
.setDescription(`CodeX botumuzu eklemek için \`${prefix}davet\` yazabilirsiniz.`)
.addField(`__Duyuru__`,` \`${prefix}duyuru\` Sunucunuzda Duyuru Yapar`,true)
.addField(`__Emoji Ekle__`, `\`${prefix}emoji-ekle <link>, <resim>, <gif>\` Sunucunuza Emoji Eklersiniz`, true) 
.addField(`__Oylama__`,` \`${prefix}oylama\` Sunucunuzda Oylama`,true)
.addField(`__Sa As__`,` \`${prefix}saas\`Sunucunuzda Sa As Açar Kapatırsınız`,true)
.addField(`__Sil__`,` \`${prefix}sil\`Belirten Miktarda Mesaj Siler`,true)
.addField(`__Yavaş Mod__`,` \`${prefix}yavaş-mod\`Belirtiğiniz Kanalda Belirtiğiniz Süreye Göre Yavaş Mod Ayarlarsınız \n MAKS:21600 saniye Yaklaşık 6 Saat`,true)
.setThumbnail(client.user.avatarURL())
.setFooter('Komutu Kullanan Kullanıcı' + message.author.tag, message.author.avatarURL())
 message.channel.send(eklenti) 
  };
exports.conf = {
  aliases: []
}
exports.help = {
  name: 'sunucu'
 }
