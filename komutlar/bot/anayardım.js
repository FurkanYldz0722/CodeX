 const db = require("quick.db");
const Discord = require('discord.js');
const ayarlar = require("../../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix 
let eklenti = new Discord.MessageEmbed()  
.setAuthor(`CodeX Yardım Menüsü`, client.user.avatarURL())
.setColor('#ffd100')
.setDescription(`CodeX Bot Yardım Menüsü    Prefixim \`${prefix}\``)  
.addField(`__Genel Komutlar__`,`<a:mobile_phone:750076057679429656> \`${prefix}genel\``,true)
.addField(`__Eğlence Komutları__`, `:stuck_out_tongue_winking_eye: \`${prefix}eğlence\``, true)
.addField(`__Moderasyon Komutları__`,`<a:ayar:799711247087566868> \`${prefix}moderasyon\` `,true)
.addField(`__Sunucu__`,`<a:shield:750076071721828452> \`${prefix}sunucu\`  `,true)
.addField(`__Koruma__`,`<a:koruma:801440857660194875> \`${prefix}koruma-sistemleri\` `, true)
.addField(`__Kayıt Sistemi__`,`<a:floppy_disk:750076062716788807> \`${prefix}kayıtsistemi\``,true)
.addField(`__Müzik Komutları__`,`<a:musical_note:750076057679429656> YAKINDA...... `,true)
.addField(`__Davet Sistemi Komutları__`,`<a:inbox_tray:750076062716788807> \`${prefix}davetsistemi\`  `,true)
.setThumbnail(client.user.avatarURL())
.setFooter('Komutu Kullanan Kullanıcı' + message.author.tag, message.author.avatarURL())
.setImage(``)
 message.channel.send(eklenti) 
  };
exports.conf = {
  aliases: []
};
exports.help = {
  name: 'yardım'
 }