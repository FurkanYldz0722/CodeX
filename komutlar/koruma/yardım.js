const Discord = require('discord.js');

exports.run = async (client, message, args,bot) => {

const emb = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
.setTitle(`**__${client.user.username} Sunucu Koruma Sistemi__**`)
.setDescription(`<a:unlem:758930479105441795> **__CodeX Guard Sistem Bilgilendirmesi__**`)
.addField(`<a:cark:758932136228159497> **__Kanal Koruma__**`,"*Kanal koruması sağlar, ayrıntılı bilgi için komudu kullanın.*\n`!kanal-koruma`")
.addField(`<a:cark:758932136228159497> **__Rol Koruma__**`,"*Rol koruması sağlar, ayrıntılı bilgi için komudu kullanın.*\n`t!rol-koruma`")
.addField(`<a:cark:758932136228159497> **__Emoji Koruma__**`,"*Emoji koruması sağlar ayrıntılı bilgi için komudu kullanın.*\n`t!emoji-koruma`")
.addField(`<a:cark:758932136228159497> **__Bot Koruma__**`,"*Botlara karşı koruma sağlar ayrıntılı bilgi için komudu kullanın.*\n`t!bot-koruma`")
.addField(`<a:cark:758932136228159497> **__Mesaj Log__**`,"*Silinen ve düzenlenen mesajları kanala gönderir. Ayrıntılı bilgi için komudu kullanın.*\n`t!mesaj-log`")
.addField(`<a:cark:758932136228159497> **__Yetkili Rol__**`,"*Role bota komut verme yetkisini verir.Ancak yine de yetkililer korumalardan etkilenir.*\n`t!yetkili`")
.addField(`<a:cark:758932136228159497> **__Dokunulmaz Rol__**`,"*Bot ayarlanmış role sahip olanları görmezden gelir. Tehlikeli bir izindir.*\n`t!dokunulmaz`")
.addField(`<a:cark:758932136228159497> **__İstatistik__**`,"*Trix Guard istatistiklerini gösterir.*\n`t!istatistik`")
 .setThumbnail(client.user.avatarURL())

    .setFooter('Komutu Kullanan Kullanıcı' + message.author.tag, message.author.avatarURL())

if(!args[0]) return message.channel.send(emb)
message.channel.send(emb)


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["koruma-sistemleri"],
  permLevel: 0
}

exports.help = {
  name: 'korumasistemleri'
};