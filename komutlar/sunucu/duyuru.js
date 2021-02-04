const send = require('quick.hook');
const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json');
let prefix = ayarlar.prefix 
exports.run = (bot, message, args, tools) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu Komutu Kullanabilmek İçin **Mesajları Yönet** Yetkisine Sahip Olman Gerek .");

    let split = '|';

    if(!args[0]) {
        return message.channel.send("**Duyuru Yapabilmen İçin Bir Mesaj Belirtmen Gerek.** `${prefix}duyuru `");
    }

    args = args.join(' ').split(split);

    for (var i = 0; i < args.length; i++) args[i] = args[0].trim();

    if(args[2]) args[2] = parseInt(`0x${args[2]}`);

    let option = {
        title: args[0] || 'CodeX Duyuru Sistemi',
        embedColor: args[2] || 0xffffff,
        icon: `https://`
    }

    const codaaree = new Discord.MessageEmbed()
        .setColor(option.embedColor)
        .setTitle(option.title)

    if(option.message) codaaree.setDescription(option.message);

    message.delete();

    let codare = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setTimestamp()
    .setTitle(option.title)
    message.channel.send(codare);

}

exports.conf = {
    aliases: ['duyuruyap','duyuru-yap'],
}

exports.help = {
    name: 'duyuru',
}