
const db = require("quick.db");
const Discord = require('discord.js');
const ayarlar = require("../../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix 
let eklenti = new Discord.MessageEmbed()  
.setColor('RANDOM') 
.setAuthor(`__CodeX Kayıt Sistemi__`, client.user.avatarURL())
.setDescription(`CodeX botumuzu eklemek için \`${prefix}davet\` yazabilirsiniz.`)
.addField(
"__Kayıt Komutları__", 
`\`${prefix}e\` Erkek Kullanıcı Olarak Kayıt Yaparsınız 
\`${prefix}k\` Kadın Kullanıcı Olarak Kayıt Yaparsınız`)

.addField("__Kayıt Rolleri Ayarlama__",
`\`${prefix}erkek-rol-ayarla\` Erkek Rolü Ayarlarsınız
\`${prefix}erkek-rol-sıfırla\` Erkek Rolünü Sıfırlarsınız
\`${prefix}kadın-rol-ayarla\` Kadın Rolü Ayarlarsınız
\`${prefix}kadın-rol-sıfırla\` Kadın Rolünü Sıfırlarsınız
\`${prefix}kayıtsız-rol-ayarla\` Kayıtsız Rolü Ayarlarsınız
\`${prefix}kayıtsız-rol-sıfırla\` Kayıtsız Rolünü Sıfırlarsınız`)

.setThumbnail(client.user.avatarURL)
 message.channel.send(eklenti) 
  };
exports.conf = {
  aliases: []
};

exports.help = {
  name: "kayıt-sistemi"
 };