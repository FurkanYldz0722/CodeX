  const db = require("quick.db");
const Discord = require('discord.js');
const ayarlar = require("../../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix 
let eklenti = new Discord.MessageEmbed()  
  .setColor("RANDOM")
  .setAuthor("**EYLEM** 7-24 Loglama")
  .setDescription("**Sonuç** Başarılı <a:onay:802166173138550874>") 
  message.channel.send(eklenti)
 };

exports.conf = {
  aliases: []
};

exports.help = {
  name:"logla"
};