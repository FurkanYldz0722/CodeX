const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const crypto = require('crypto-global')
const unit = args[0]
if (!unit) return message.channel.send("Lütfen Bir Kripto Para Belirtiniz. \`!kripto bitcoin\`")
let all = await crypto.all(unit)
const embed = new Discord.MessageEmbed()
.setColor('#BLUE')
.setThumbnail(all.icon)
.setAuthor(all.name)
.addField('__Fiyat (TRY)__', `\`${all.try}\``)
.addField('__Fiyat (USD)__', `\`${all.usd}\``)
.addField('__24 Saatlik Hacim__', `\`${all.vol24}\``)
.addField('__Aktif Hacim__', `\`${all.market}\``)
.addField('__1 yılın en düşük değeri__', `\`${all.lower}\``)
.addField('__1 yılın en yüksek değeri__', `\`${all.higher}\``)
.addField('__Anlık Yüzdelik Değeri__', `\`${all.percent}\``)
.setImage(all.table)
message.channel.send(embed)
};
exports.conf = {
 aliases: ["kripto"],
};

exports.help = {
 name: 'crypto',
 description: '',
 usage: 'crypto'

};