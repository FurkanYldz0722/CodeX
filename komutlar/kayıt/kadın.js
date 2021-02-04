const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {

const kadınroleID = await data.fetch(`kadın.${message.guild.id}`);
const yetkiliroleID = await data.fetch(`yetkili.${message.guild.id}`);
const kayıtsızroleID = await data.fetch(`kayıtsız.${message.guild.id}`);

const nn = new Discord.MessageEmbed().setThumbnail();
if(!args[0] || !message.mentions.members.first()) return message.channel.send(nn.setTitle('Bir Hata Oldu!').setColor('#000001').setDescription(`Kullanıcı Etiketleyerek Dener Misin?

**Örnek:**
\`\`\`${client.ayarlar.prefix}kadın @codex
${client.ayarlar.prefix}kadın @etiket codex 21

${client.ayarlar.prefix}kadın 318998310989987840
${client.ayarlar.prefix}kadın 318998310989987840 codex 21\`\`\``)).then(a => a.delete({timeout: 10000}));


let member = message.mentions.members.first();
let kadın = message.guild.roles.cache.get(kadınroleID);
let yetkili = message.guild.roles.cache.get(yetkiliroleID);
let kayıtsız = message.guild.roles.cache.get(kayıtsızroleID);
if(!kadın||!kayıtsız||!yetkili) return;
let isim;
if(args[1]) {
isim = args.slice(1).join(' ');
} else {
isim = member.user.username;
}

if(!message.member.roles.cache.has(yetkiliroleID)) return message.channel.send(nn.setDescription(`${yetkili} | Rolüne Sahip Olman Gerekiyor.`));
if(!member.roles.cache.has(kayıtsızroleID)) return message.channel.send(nn.setColor('#000001').setDescription(`${kayıtsız} | Bu Rol Kayıt Edilecek Üyenin Üzerinde Bulunması Gerekiyor .`));;
const n = await data.fetch(`tag.${message.guild.id}`);

member.roles.add(kadın.id);
member.roles.remove(kayıtsız.id);
data.add(`say.kadın.${message.author.id}.${message.guild.id}`, 1);
if(isim && nn) member.setNickname(n+isim); 
if(isim && !n) member.setNickname(isim);
if(!isim && n) member.setNickname(n+member.user.username);

message.channel.send(nn.setThumbnail(member.user.avatarURL() ? member.user.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png').setTitle(`İşte Bu Kadar! [ Kayıt Başarılı. ]`)
.setDescription(`${member} **Kullanıcısına ${kadın} Rolü Verildi .**

${message.author} **Kayıt sayın:** \`${client.ayarlar.prefix}profil Yazarak Görebilirsin !\`
\`\`\`${isim} İsim Olarak Kayıt Edildi! \`\`\`
`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['k', 'K', 'Kadın', 'women', 'Women'],
  permLevel: 0
}

exports.help = {
  name: 'kadın'
};