const Discord = require('discord.js');
const data = require('quick.db');
const ms = require('ms');

exports.run = async (client, message, args) => {
const logChannel = await data.fetch(`jail.log.${message.guild.id}`);
const jailYetkili = await data.fetch(`jail.yetkilirole.${message.guild.id}`);
const karantinaRole = await data.fetch(`jail.karantinarole.${message.guild.id}`);
if(!logChannel) return;
if(!jailYetkili) return;
if(!karantinaRole) return;

const errorEmbed = new Discord.MessageEmbed()
.setColor('#00001');
const errorEmbed2 = new Discord.MessageEmbed()
.setTitle('Bir hata oldu!');

if(!message.member.permissions.has(jailYetkili)) return message.channel.send(errorEmbed.setDescription(`${message.guild.roles.cache.get(jailYetkili)} | Rolüne sahip olman gerekiyor.`));
if(!args[0]) return message.channel.send(errorEmbed.setTitle('Bir hata oldu!').setDescription(`Kullanıcı etiketleyerek dener misin?`));

let member;
if(message.mentions.members.first()) {
member = message.mentions.members.first();
} else if(args[0]) {
member = message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(errorEmbed.setTitle('Bir hata oldu!').setDescription(`Kullanıcı etiketleyerek dener misin?`));
}

if(message.author.id === member.id) return message.channel.send(new Discord.MessageEmbed().setColor('#9c5cb2').setTitle('Agaa beeeeeeeee!').setDescription(`O kadar yürekli olamazsın.. 🙄`))
if(member.permissions.has('ADMINISTRATOR')) return message.channel.send(errorEmbed2.setDescription('Yönetici bir kullanıcıya karışamam!'));

message.channel.send(new Discord.MessageEmbed().setTitle('Karantinaya Biri Gitti').setDescription(`${member} Kullanıcısını Karantinaya Postaladık.`));
member.roles.cache.forEach(s => member.roles.remove(s.id));
member.roles.add(karantinaRole);
message.guild.channels.cache.get(logChannel).send(new Discord.MessageEmbed().setColor('#00001').setTitle('Karantinaya Biri Geldi')
.setDescription(`${member} Kullanıcısının Tüm Rollerine El Koyuldu.

${message.guild.roles.cache.get(karantinaRole)} Kapsamına alınarak Kontrolü Kısıtlandı.`).setImage('https://cdn.glitch.com/322deae8-c50e-4ad8-a7d2-ff13f650466d%2Ftenor.gif')
.setFooter(`${message.author.username} Tarafından Karantinaya Alındı`, message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png').setThumbnail(member.user.avatarURL() ? member.user.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png'))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['cezalı', 'Cezalı'],
  permLevel: 0
}

exports.help = {
  name: 'jail'
};