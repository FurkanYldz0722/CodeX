const Discord = require('discord.js');
const funnyWords = require("funny-words");

exports.run = async (client, message, args) => {
if(!message.mentions.members.first()) return message.channel.send(new Discord.MessageEmbed().setColor('#000001').setDescription(`Kullanıcı Etiketleyerek Dener Misin?`)).then(a => a.delete({timeout: 10000}))
var gifler = [
  "https://media.tenor.com/images/5c8f883ecbd92dee4da8f1fc67be32c3/tenor.gif", 
  "https://media.tenor.com/images/4884e76b181d3f87f4e8243208c8a362/tenor.gif",
  "https://media.tenor.com/images/a93a2af0d136931aebeff8040e3982a5/tenor.gif",
  "https://media.tenor.com/images/a2e8ad72e1e8c4030b89ff1ef40ee2f5/tenor.gif", 
];
let resimler = gifler[Math.floor(Math.random() * gifler.length)];
if(message.author.id === message.mentions.members.first().id) return message.channel.send(new Discord.MessageEmbed().setColor('#00567e').setTitle('Dur Orda!').setDescription('Kendini Hackleyeceksin Olum Sakin.')).then(a => a.delete({timeout: 10000}))
message.channel.send(`> ${message.author} ${message.mentions.members.first()} **Kişisini Hackledi.**`, new Discord.MessageAttachment(resimler));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'hackle'
};