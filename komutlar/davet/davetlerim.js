const Discord = require("discord.js"),
  db = require("quick.db");
exports.run = async (client, message, args, tools) => {
  let kişi;
  if (message.mentions.members.first()) {
    kişi = message.mentions.members.first();
  } else {
    kişi = message.author;
  }
  let bilgi = await db.fetch(`davet_${kişi.id}_${message.guild.id}`);
  let sayı2;
  if (!bilgi) {
    sayı2 = 0;
  } else {
    sayı2 = await db.fetch(`davet_${kişi.id}_${message.guild.id}`);
  }
  let veri = await db.fetch(`rol1_${message.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${message.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${message.guild.id}`);
  let veri2 = await db.fetch(`rol2_${message.guild.id}`);
  if (!veri) {
    const embed = new Discord.MessageEmbed()
      .addField(`Davetlerin Sahibi`, `<@` + kişi.id + `>`, true)
      .addField(`Total Davet:`, sayı2, true)
      .setColor("#ffd100")
.setThumbnail(`https://cdn.glitch.com/968f0b5b-2d9f-4c4f-9f55-fe3e443192cf%2FScreenshot_20210111_105620.jpg?v=1610404060763`)

    message.channel.send(embed);
  }
  if (message.member.roles.cache.has(veri2)) {
    const embed = new Discord.MessageEmbed()
      .addField(`Davetlerin Sahibi`, `<@` + kişi.id + `>`, true)
      .addField(`Total Davet:`, sayı2, true)
      .setColor("#ffd100")
.setThumbnail(`https://cdn.glitch.com/968f0b5b-2d9f-4c4f-9f55-fe3e443192cf%2FScreenshot_20210111_105620.jpg?v=1610404060763`)
    message.channel.send(embed);
    return;
  }
  if (!message.member.roles.cache.has(veri)) {
    const embed = new Discord.MessageEmbed()
      .addField(`Davetlerin Sahibi`, `<@` + kişi.id + `>`, true)
      .addField(`Total Davet:`, sayı2, true)
      .setColor("#ffd100")
.setThumbnail(`https://cdn.glitch.com/968f0b5b-2d9f-4c4f-9f55-fe3e443192cf%2FScreenshot_20210111_105620.jpg?v=1610404060763`)

      .setDescription(
        `${message.guild.roles.cache.get(veri).name} rolü için son ${-sayı2 -
          -veri12} davet!`
      );
    message.channel.send(embed);
    return;
  }
  if (message.member.roles.cache.has(veri)) {
    if (!veri2) {
      const embed = new Discord.MessageEmbed()
        .addField(`Davetlerin Sahibi`, `<@` + kişi.id + `>`, true)
        .addField(`Total Davet:`, sayı2, true)
        .setColor("#ffd100")
.setThumbnail(`https://cdn.glitch.com/968f0b5b-2d9f-4c4f-9f55-fe3e443192cf%2FScreenshot_20210111_105620.jpg?v=1610404060763`)

      message.channel.send(embed);
      return;
    }
    if (veri2) {
      const embed = new Discord.MessageEmbed()
        .addField(`Davetlerin Sahibi`, `<@` + kişi.id + `>`, true)
        .addField(`Total Davet:`, sayı2, true)
        .setColor("#ffd100")
.setThumbnail(`https://cdn.glitch.com/968f0b5b-2d9f-4c4f-9f55-fe3e443192cf%2FScreenshot_20210111_105620.jpg?v=1610404060763`)
        .setFooter(client.user.username, client.user.avatarURL())

        .setDescription(
          `${message.guild.roles.cache.get(veri2).name} rolü için son ${-sayı2 -
            -veri21} davet!`
        );
      message.channel.send(embed);
      return;
    }
  }
  
};
exports.conf = {
  aliases: ["davetk", "davetlerim","invites","invite", 'davet-say', 'davetsay']
};

exports.help = {
  name: 'davetler'
 };