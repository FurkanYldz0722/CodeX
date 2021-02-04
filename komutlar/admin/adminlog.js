const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);

let adminlog = message.mentions.channels.first();
let adminlogkanal = await db.fetch(`log_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!adminlogkanal) return message.channel.send(`**AdminModlog Kanalı Zaten ayarlı değil**`);
    db.delete(`log_${message.guild.id}`)
   message.channel.send(`**AdminLog Kanalı başarıyla sıfırlandı.**`);
  
    return
  }
  
if (!adminlogkanal) return message.channel.send(`**Bir modlog kanalı belirtmelisin.**`);

db.set(`log_${message.guild.id}`, adminlog.id)

message.channel.send(`**Admin-Log kanalı başarıyla ${adminlog} olarak ayarlandı.**`);
 message.react('607634966959882250')
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['log-kanal']
  
};

exports.help = {
    name: "adminlog"
};