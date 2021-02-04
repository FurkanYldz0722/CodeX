const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../../ayarlar.json");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  if (!message.member.hasPermission("ADMINISTRATOR")) {
  message.channel.send(`**Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);

    return;
  }
  let kanal = await db.fetch(`davetkanal_${message.guild.id}`)
  if (!kanal) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Davet kanalı zaten ayarlanmamış!")
      .setFooter(bot.user.username, bot.user.avatarURL)
        .setColor("RED")
    );
  }
  db.delete(`davetkanal_${message.guild.id}`)
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
  .setFooter(bot.user.username, bot.user.avatarURL)
    .setDescription(`Davet kanalı başarıyla sıfırlandı!`);
  message.channel.send(embed);
return
  
};
exports.conf = {
  aliases: ["davetkanalsıfırla"]
};
exports.help = {
  name: "davet-kanal-sıfırla"
 };

