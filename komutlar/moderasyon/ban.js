const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require('../../ayarlar.json');

exports.run = async (client, message, args) => {
   let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix //! yerine prefixiniz
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first() || client.users.cache.get(args[0])
  if (!user) return message.reply('Kimi banlayacağını yazmalısın.').catch(console.error);
  if (reason.length < 1) return message.reply('Ban sebebini yazmalısın.');
  guild.members.ban(user, { reason: reason });
  message.channel.send("Kullanıcı başarıyla banlandı.")

  const embed = new Discord.MessageEmbed()
message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
  kategori: "mod"
};
exports.help = { 
	name: 'ban', 
	description: 'Belirttiğiniz kişiyi sunucudan banlarsınız.', 
	usage: 'ban' 
}