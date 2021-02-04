const Discord = require('discord.js');
const funnyWords = require("funny-words");

exports.run = async (client, message, args) => {
if(!message.mentions.members.first()) return message.channel.send(new Discord.MessageEmbed().setColor('#000001').setDescription(`İkram Etmek İstediğin Kişiyi Etiketle.`)).then(a => a.delete({timeout: 10000}))
var gifler = [
  "https://cdn.glitch.com/968f0b5b-2d9f-4c4f-9f55-fe3e443192cf%2Fezgif.com-gif-maker%20(1).gif?v=1611314714417",
];
let resimler = gifler[Math.floor(Math.random() * gifler.length)];
if(message.author.id === message.mentions.members.first().id) return message.channel.send(new Discord.MessageEmbed()
.setColor('#00567e')
.setTitle('Dur Orda!')  
.setDescription('Aç Gözlü Olma Oğlum İkram Ediceksin.'))
.then(a => a.delete({timeout: 10000}))
message.channel.send(`> ${message.author} ${message.mentions.members.first()} **Kişisine Soda ikram Ediyor..**`, new Discord.MessageAttachment(resimler));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'soda'
};