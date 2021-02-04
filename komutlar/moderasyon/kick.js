const Discord = require('discord.js');
const fs = require('fs');

const ayarlar = require('../../ayarlar.json');

exports.run = async(client, message, args) => {

  let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix


  const db = require('quick.db');
  

  
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('**Gerekli izniniz bulunmuyor**')

  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
 if (db.has(`log_${message.guild.id}`) === false) return message.channel.send(`**Mod Log Kanalı Ayarlanmamış Ayarlamak için  | ${prefix}modlog #kanal`);
  let modlog = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (message.mentions.users.size < 1) return message.channel.send('**Lütfen Kicklemek İstediğiniz Kullanıcıyı Etiketleyin**');
  if (reason.length < 1) return message.channel.send('**Kickleme Sebebinizi Giriniz**');
  if (user.id === message.author.id) return message.channel.send('**Kendini Kickleyeceğine Kendin Çıksana ?**');

  const embed = new Discord.MessageEmbed()
  .setColor("#ffd100")
  .addField('İşlem', 'Sunucudan Kickleme')
  .addField('Kicklenen Üye', `${user.tag} (${user.id})`)
  .addField('Kickleyen Yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Kick Sebebi', "```" + reason + "```")
  modlog.send(embed);
  
  message.guild.member(user).kick();
  
  const embed2 = new Discord.MessageEmbed()
  .setColor("#ffd100")
  .setDescription(`**Kullanıcı Başarıyla Kicklendi**`)
  message.channel.send(embed2)
  
};

exports.conf = {
aliases: ['kick']
} 

exports.help = {  
  name: 'at'
};

