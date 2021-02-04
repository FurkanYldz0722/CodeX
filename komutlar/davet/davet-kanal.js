const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../../ayarlar.json");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  if (!message.member.hasPermission("ADMINISTRATOR")) {
   message.channel.send(`**Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);
    return;
  }
  let kanal = message.mentions.channels.first();
  if (!kanal) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Lütfen bir kanal belirtiniz!")
      .setFooter(bot.user.username, bot.user.avatarURL)
        .setColor("RED")
    );
  }
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
  .setFooter(bot.user.username, bot.user.avatarURL)
    .setDescription(`Davet kanalı; ${kanal} olarak ayarlandı!`);
  message.channel.send(embed);
  db.set(`davetkanal_${message.guild.id}`, kanal.id);
};
exports.conf = {
  aliases: ["davetkanal"]
};

exports.help = {
  name: 'davet-kanal' 
 };

