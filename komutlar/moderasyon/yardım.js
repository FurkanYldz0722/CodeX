 const db = require("quick.db");
const Discord = require('discord.js');
const ayarlar = require("../../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix 
let eklenti = new Discord.MessageEmbed()  
.setAuthor(`CodeX Moderasyon Menüsü`, client.user.avatarURL())
.setColor('RANDOM')
.setDescription(`CodeX Botumuzu Eklemek İçin \`${prefix}davet\`Yazabilirsiniz`)  
.addField(`__Ban__`,`\`${prefix}ban\`Etiketlediğiniz Kişiyi Banlarsınız`,true)
.addField(`__Unban__`,`\`${prefix}unban\`Etiketlediğiniz Kişinin Banını Kaldırırsınız`,true)
.addField(`__Ban Say__`,`\`${prefix}bansay\`Sunucudaki Banlanan Kişileri Gösterir`,true)
.addField(`__Ban Sorgu__`,`\`${prefix}bansorgu\`Etiketlediğiniz Kişinin Neden Ban Yediğini Gösterir`,true)
.addField(`__Küfür Engel__`,`\`${prefix}küfür-engel\`Sunucunuzda Küfür Engel Açıp Kapatırsınız`,true)
.addField(`__Reklam Engel__`,`\`${prefix}reklam-engel\`Sunucunuzda Reklam Engel Açıp Kapatırsınız`,true)
.addField(`__Yasaklı Tag__`,`\`${prefix}yasaklı-tag\`Sunucunuzda Yasaklı Tag Belirlersiniz`,true)
.addField(`__Mod Log__`,`\`${prefix}modlog\`Sunucunuzda Mod Log Kanalı Belirlersiniz`, true)
.addField(`__Mod Log Sıfırla`,`\`${prefix}modlogsıfırla\`Mod Log Kanalını Sıfırlarsınız`, true)
.setThumbnail(client.user.avatarURL())
.setFooter('Komutu Kullanan Kullanıcı' + message.author.tag, message.author.avatarURL())
 message.channel.send(eklenti) 
  };
exports.conf = {
  aliases: []
};

exports.help = {
  name: 'moderasyon'
 };
