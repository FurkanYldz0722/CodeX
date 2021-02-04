const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const moment = require("moment");
const os = require('os');
const db = require("quick.db")
require("moment-duration-format");
let prefix = ayarlar.prefix

exports.run = async (bot, client, message, args) => {
  const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  const msg = message
   const bunemq = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const annencilermaldır = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setFooter('CODEX  \'Buyur benim istatistiklerim', bot.user.displayAvatarURL())
  .setThumbnail(bot.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
  .addField("» **Botun Sahipleri İçin**", `${prefix}yapımcım`)
  .addField("» **Sunucuda Kullanılan Prefix**", `${prefix}`)
  .addField("» **Bellek kullanımı**", (process.memoryUsage().heapUsed / 512 / 512).toFixed(2) + ' MB', true)  
  .addField("» **Çalışma süresi**", bunemq)
  .addField('» **Kullanıcılar**:', bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0))
  .addField("» **Sunucular**", bot.guilds.cache.size.toLocaleString(), true)
  .addField("» **Kanallar**", bot.channels.cache.size.toLocaleString(), true)
  .addField("» **Discord.JS sürüm**", "v"+Discord.version, true)
  .addField("» **Node.JS sürüm**", `${process.version}`, true)
  .addField("» **Ping**", bot.ws.ping+" ms", true)
  .addField("» **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
  .addField("» **Bit**", `\`${os.arch()}\``, true)
  .addField("» **İşletim Sistemi**", `\`${os.platform()}\``)
  .addField("**» Bot Davet**", "YAKINDA... [YAKINDA...]()")
  .addField("**» Destek Sunucusu**", "YAKINDA... [Sunucumuza Katıl]()")
 message.channel.send(annencilermaldır);
  };
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['botbilgi'], 
  permLevel: 0
};
 
exports.help = {
  name: "istatistik"
};///CODEX