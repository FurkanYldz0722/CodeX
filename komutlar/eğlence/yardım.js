const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("../../ayarlar.json")
const prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`CodeX Eğlence Komutları`, message.author.avatarURL())
    .setDescription(`CodeX Botumuzu Eklemek İçin \`${prefix}davet\` Yazabilirsiniz`)
    .addField(`__Adam Asmaca__`, `\`${prefix}adam-asmaca\` Adam Asmaca Oynarsınız.`)
    .addField(`__Aşk Ölçer__`, `\`${prefix}aşk-ölçer <@kullanıcı>\` Etiketlediğiniz Kişiyle Aşkınızı Ölçer.`)
    .addField(`__Düello__`, `\`${prefix}düello <@kullanıcı>\` Etiketlediğiniz Kişiyle Savaşırsınız.`)
    .addField(`__Dürüm__`, `\`${prefix}dürüm\` Dürüm Yersiniz.`)
    .addField(`__Fal__`, `\`${prefix}fal\` Falınıza Bakarsınız.`)
    .addField(`__Fbi__`, `\`${prefix}fbi\` Fbi Çağırır.`)
    .addField(`__Hackle__`, `\`${prefix}hackle <@kullanıcı>\` Etiketlediğiniz Kullanıcıyı Hacklersiniz.`)
    .addField(`__Hesapla__`, `\`${prefix}hesapla\` Belirtilen Matematik İşlemini Hesaplar.`)
    .addField(`__Kare__`, `\`${prefix}kare\` Yazdığınız Sayının Karesini Gösterir.`)
    .addField(`__Kaç Cm__`, `\`${prefix}kaçcm\` Malafatınızın Kaç Santim Olduğunu Gösterir.`) 
    .addField(`__Sarıl__ `, `\`${prefix}sarıl <@kullanıcı>\` Etiketlediğiniz Kişiye Sarılırsınız.`)
    .addField(`__Soda__`, `\`${prefix}soda <@kullanıcı>\` Etiketlediğiniz Kişiye Soda Ismarlarsınız.`)
    .addField(`__Sor__`, `\`${prefix}sor\` Bota Soru Sorarsınız.`)
    .addField(`__Stres Çarkı__`, `\`${prefix}stres-çarkı\` Stres Çarkı Oynarsınız`) 
    .addField(`__Tokat At__`, `\`${prefix}tokat-at <@kullanıcı>\` Etiketlediğiniz Kişiye Tokat Atarsınız.`)
    .addField(`__Yazı Tura__`, `\`${prefix}yazı-tura\` Yazı Tura Oynarsınız.`) 
    .addField(`__Zar At__ `, `\`${prefix}zar-at\` Zar Atarsınız`)
    .setThumbnail(client.user.avatarURL())
    .setFooter(
      "Komutu Kullanan Kullanıcı" + message.author.tag,
      message.author.avatarURL()
    );
  message.channel.send(embed);
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "eğlence"
};
