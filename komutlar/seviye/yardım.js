const Discord = require("discord.js" );
const ayarlar = require("../../ayarlar.json")
const prefix = ayarlar.prefix

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(`CodeX Seviye Komutları`)
.setDescription(`CodeX Botumuzu Sunucunuza Davet Etmek İsterseniz \`${prefix}\` davet Yazabilirsiniz`)
.addField(`\`${prefix}\`seviye`,`Seviyenizi atar.`)
.addField(`\`${prefix}\`seviye-ayarlar`,`seviye komutlarının sunucudaki ayarlarını atar.`)
.addField(`\`${prefix}\`seviye-aç`,`Seviye Sistemini açarsınız.`)
.addField(`\`${prefix}\`seviye-kapat`,`Seviye sistemini kapatırsınız.`)
.addField(`\`${prefix}\`seviye-log`,`Level atlayan kullanıcıları bu kanala atar.`)
.addField(`\`${prefix}\`seviye-rol`,`Seviye ödülünü ayarlarsınız.`)
.addField(`\`${prefix}\`seviye-xp`,`mesaj başına gelecek puanı ayarlarsınız.`)
.setThumbnail(client.user.avatarURL())
.setFooter('Komutu Kullanan Kullanıcı' + message.author.tag, message.author.avatarURL())

message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["seviye-sistemi"], 
  permLevel: 0 
};

exports.help = {
  name: "seviyeyardım",
  description: `Tüm komutları gösterir.`,
  usage: "yardım" 
};