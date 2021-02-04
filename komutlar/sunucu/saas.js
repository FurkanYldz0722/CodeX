const db = require('quick.db')
const Discord = require('discord.js')
 
 
exports.run = async (bot, message, args) => {

  const fynx = require("../../ayarlar.json");
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
  
  if (!args[0]) return message.channel.send(`Aç yada kapat yazmalısın!! Örnek: **${prefix}sa-as aç**`)
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**Bu komutu kullanmak için \`MESAJLARI_YÖNET\` yetkisine sahip olmalısın!**')
 
  if (args[0] === 'aç') {
    
    db.set(`ssaass_${message.guild.id}`, 'acik')
    message.channel.send(`**saas Sistemi Başarıyla Açıldı <a:onay:802166173138550874>. Kapatmak için "\`${prefix}sa-as kapat\`" yazmalısın.**`)
 
  }
  
  if (args[0] === 'kapat') {
    
    db.set(`ssaass_${message.guild.id}`, 'kapali')
    message.channel.send(`**saas Sistemi Başarıyla Kapatıldı <a:onay:802166173138550874>**`)

  }
 
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sa-as-sistemi']
};

exports.help = {
  name: 'sa-as'
};
 
