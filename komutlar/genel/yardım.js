const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
 let embed = new Discord.MessageEmbed()
 .setColor('RANDOM') 
 .setAuthor(`CODEX Genel Komutlar`, message.author.avatarURL())
 .setDescription(`CODEX Botumuzu Eklemek İçin \`${prefix}davet\` Yazabilirsiniz. `)
.addField(`__Afk__`, `\`${prefix}afk <sebep>\` Afk Olursunuz`, true) 
.addField(`__Avatar__`, `\`${prefix}avatar\` Avatarınızı Gösterir`, true)
.addField(`__Deprem Bilgi__`, `\`${prefix}deprembilgi\` Türkiyedeki Son 10 Depremi Gösterir`, true)
.addField(`__Döviz__`, `\`${prefix}döviz <parabirimi>\` Döviz Bilgisini Gösterir.`, true) 
.addField(`__Günlük Burç Bilgi__`, `\`${prefix}günlük-burç <burç ismin>\` Günlük Burç İstatistiklerini Gösterir`, true)
.addField(`__Kripto Para__`, `\`${prefix}kripto <kriptobirimi>\` Kripto Para Bilgisini Gösterir`, true)
 .setThumbnail(client.user.avatarURL())
.setFooter('Komutu Kullanan Kullanıcı' + message.author.tag, message.author.avatarURL()) 
 
 message.channel.send(embed)
 };

exports.conf = {
  aliases:['genel']
 };
exports.help = {
  name:'genel'
 };
                       
