const Discord = require("discord.js");
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const db = require("quick.db");
const moment = require("moment")
const proton = require("proton-io");
//const { Player } = require("discord-music-player");
const AsciiTable = require("ascii-table");
const fs = require("fs");
require("./util/Loader.js")(client);

//SİTE İÇİN

const express = require("express");
const app = express();

const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

// send the default array of dreams to the webpage  // express helps us take JS objects and send them as JSON
 app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("CodeX Website Aktif. Website Portunuz " + listener.address().port);
});


/////TABLES
var commandtable = new AsciiTable("CODEX KOMUT LİSTE");
////

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

commandtable.setHeading("Komut", "Bilgi", "Diğer Ek");
fs.readdirSync("./komutlar").forEach(dir => {
  const commandFiles = fs
    .readdirSync(`./komutlar/${dir}/`)
    .filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const komutcuklar = require(`./komutlar/${dir}/${file}`);
    if (komutcuklar.help.name) {
      client.commands.set(komutcuklar.help.name, komutcuklar);
      commandtable.addRow(
        komutcuklar.help.name,
        "✅",
        komutcuklar.conf.aliases
      );
    } else {
      commandtable.addRow(komutcuklar.help.name, "❌");
      continue;
    }
    komutcuklar.conf.aliases.forEach(alias => {
      client.aliases.set(alias, komutcuklar.help.name);
    });
  }
});

console.log(commandtable.toString());

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip_id) permlvl = 4;
  return permlvl;
};

client.on("guildDelete", (message, guild) => {
  let adminlogs = db.get(`log_${message.guild.id}`);
  const adminlogkanal = message.guild.channels.cache.find(
    kanal => kanal.id === adminlogs
  );
  if (!adminlogkanal) return;
  let embed = new Discord.MessageEmbed()

    .setColor("RED")
    .setTitle(" Bot Atıldı ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  adminlogkanal.send(embed);
});

client.on("guildCreate", (message, guild) => {
  let adminlogs = db.get(`log_${message.guild.id}`);
  const adminlogkanal = message.guild.channels.cache.find(
    kanal => kanal.id === adminlogs
  );
  if (!adminlogkanal) return;
  let embed = new Discord.MessageEmbed()

    .setColor("GREEN")
    .setTitle(" Bot Eklendi ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  adminlogkanal.send(embed);
});

//Discord.Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'

//-----------------Etiket Prefix-----------------\\

client.on("message", async msg => {
  let prefix = (await db.fetch(`prefix.${msg.guild.id}`)) || ayarlar.prefix;

  if (msg.content == `<@798169814278864946>`)
    return msg.channel.send(
      `> **CODEX | Prefix**\n\n>**Sanırım beni etiketlediniz.**\n>Buyurun prefix(ön ek)im \`${prefix}\``
    );
});

//---------------------------------------------------\\
///AFK SYSTEM///
client.on('message', async message => {// chimp'∞B#1008
if(message.channel.type === 'dm') return;
if(await db.fetch(`afk.${message.author.id}.${message.guild.id}`) == undefined) return;
const ms = require('ms')

if(message.content.length > 2) {
const sebepp = await db.fetch(`sebep.${message.author.id}.${message.guild.id}`)
const sp = await db.fetch(`giriş.${message.author.id}.${message.guild.id}`)
const asd = await db.fetch(`display.${message.author.id}.${message.guild.id}`)

  let atılmaay = moment(Date.now()+10800000).format("MM")
  let atılmagün = moment(Date.now()+10800000).format("DD")
  let atılmasaat = moment(Date.now()+10800000).format("HH:mm:ss")
  let atılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``


message.guild.members.cache.get(message.author.id).setNickname(asd)
const embed = new Discord.MessageEmbed()
.setTitle(`${message.author.username}, hoşgeldin!`)
.setColor('GREEN')
.setDescription(`Afk modundan başarıyla çıkış yaptın.`)
.addField('Giriş sebebin:', sebepp) 
.addField('AFK olma zamanın:', sp)
.addField('Çıkış zamanın:', atılma)
  message.channel.send(embed)
db.delete(`afk.${message.author.id}.${message.guild.id}`)
db.delete(`sebep.${message.author.id}.${message.guild.id}`)
db.delete(`giriş.${message.author.id}.${message.guild.id}`)
db.delete(`display.${message.author.id}.${message.guild.id}`)
}

})
//-----------------------------------------------------------------ROL KORUMA KISMI-------------------------------------------------------------------------------

  client.on('roleDelete', async role => {
    let cezalı = db.fetch(`cezalı.${role.guild.id}`)
    if(db.has(`rol2.${role.guild.id}`)) return
    if(!db.has(`silrol.${role.guild.id}`)) return
    let guild = role.guild;
var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    let e = await guild.fetchAuditLogs({type: 'ROLE_DELETE'});
    let member = guild.members.cache.get(e.entries.first().executor.id);
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
    member.roles.set("")
    let mention = role.mentionable;
    let hoist = role.hoist;
    let color = role.hexColor;
    let name = role.name;
    let perms = role.permissions;
    let position = role.position;
    role.guild.roles.create({
      name: name,
      color: color,
      hoist: hoist,
      position: position,
      permissions: perms,
      mentionable: mention
    }).then(async rol => {
if(db.has(`rollog.${role.guild.id}`)){
const emb1 = new Discord.MessageEmbed()
.setTimestamp()
.setColor("BLUE")
.setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setTitle(`Sunucuda Bir Rol Silindi`)
.addField("<a:ayar:799711247087566868> Yetkili", member)
.addField("<a:ayar:799711247087566868> Silinen Rol", rol)
.setThumbnail(member.user.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setFooter(client.user.username,client.user.avatarURL())
  client.channels.cache.get(db.fetch(`rollog.${role.guild.id}`)).send(emb1)
    }})
   db.set(`rol1.${role.guild.id}`,"1")
   }
   setTimeout(function() {
    db.delete(`rol1.${role.guild.id}`)},1000)
   })











   client.on('roleCreate', async role => {
     if(db.has(`rol1.${role.guild.id}`)) return
    if(!db.has(`acrol.${role.guild.id}`)) return
  let guild = role.guild;
  var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    let e = await guild.fetchAuditLogs({type: 'ROLE_CREATE'});
    let member = guild.members.cache.get(e.entries.first().executor.id);
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
role.delete().then(async rol =>{
if(db.has(`rollog.${role.guild.id}`)){
const emb1 = new Discord.MessageEmbed()
.setTimestamp()
.setColor("BLUE")
.setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setTitle(`Sunucuda Bir Rol Oluşturuldu.`)
.addField("<a:ayar:799711247087566868> Yetkili", member)
.addField("<a:ayar:799711247087566868> Oluşturulan Rol Adı", rol.name)
.setThumbnail(member.user.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setFooter(client.user.username,client.user.avatarURL())
  client.channels.cache.get(db.fetch(`rollog.${role.guild.id}`)).send(emb1)
   }})
  db.set(`rol2.${role.guild.id}`,"1")}
  setTimeout(function() {
    db.delete(`rol2.${role.guild.id}`)},1000)
})
    










   client.on("roleUpdate", async (oldRole, newRole) => {
    if(!db.has(`duzrol.${newRole.guild.id}`)) return;
  let guild = newRole.guild;
  var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    let e = await guild.fetchAuditLogs({type: 'ROLE_UPDATE'});
    let member = guild.members.cache.get(e.entries.first().executor.id);
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
newRole.edit({
  name : oldRole.name,
  color : oldRole.hexColor,
  hoist : oldRole.hoist,
  mentionable : oldRole.mentionable,
  permissions : oldRole.permissions,
  position : oldRole.position
})
if(db.has(`rollog.${newRole.guild.id}`)){
const emb1 = new Discord.MessageEmbed()
.setTimestamp()
.setColor("BLUE")
.setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setTitle(`Sunucuda Bir Rol Oluşturuldu.`)
.addField("<a:ayar:799711247087566868> Yetkili", member)
.addField("<a:ayar:799711247087566868> Düzenlenen Rol", newRole)
.setThumbnail(member.user.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
.setFooter(client.user.username,client.user.avatarURL())
  client.channels.cache.get(db.fetch(`rollog.${newRole.guild.id}`)).send(emb1)
   }}})
    

   //---------------------------------------------------------------------KANAL KORUMA---------------------------------------------------------------------------
   
   client.on('channelDelete', async function(channel) {
    if(!db.has(`silkanal.${channel.guild.id}`)) return;
    if(db.has(`kanal1.${channel.guild.id}`)) return;
    const fetch = await channel.guild.fetchAuditLogs({type: "CHANNEL_DELETE"}).then(log => log.entries.first())
    let yapanad= fetch.executor;
    let guild = channel.guild;
    var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    if (yapanad.id === "758922896503472168") return;
    let member = guild.members.cache.get(yapanad.id)
    if(guild.owner.id !== yapanad.id && !member.roles.cache.has(dokunulmaz)){
    member.roles.set("")
    if(channel.type === "voice") {
      let kategoriID = channel.parentID;
      let isim = channel.name;
      let sıra = channel.position;
      let limit = channel.userLimit;
      const emb1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("BLUE")
      .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTitle(`Sunucuda Bir Kanal Silindi`)
      .addField("<a:ayar:799711247087566868> Yetkili", yapanad)
      .addField("<a:ayar:799711247087566868> Silinen Kanal", channel.name)
      .addField("<a:ayar:799711247087566868> Kanal Kategorisi", channel.parent)
      .addField("<a:ayar:799711247087566868> Kanal Türü", "Ses Kanalı")
      .setFooter(client.user.username,client.user.avatarURL())
      client.channels.cache.get(db.fetch(`kanallog.${channel.guild.id}`)).send(emb1)
      channel.clone(this.name,true,false).then(kanal => {
        let z = channel.guild.channels.cache.get(kanal.id)
        z.setParent(z.guild.channels.cache.find(channel => channel.id === kategoriID))
        z.edit({position:sıra,userLimit:limit})
        db.set(`kanal2.${newChannel.guild.id}`,"1")
      })
    }
    if(channel.type === "text") {
      let açıklama = channel.topic;
      let kategoriID = channel.parentID;
      let isim = channel.name;
      let sıra = channel.position;
      let nsfw = channel.nsfw;
      channel.clone(this.name,true,true).then(kanal => {
        const emb1 = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor("BLUE")
        .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
        .setTitle(`Sunucuda Bir Kanal Silindi`)
        .addField("<a:ayar:799711247087566868> Yetkili", yapanad)
        .addField("<a:ayar:799711247087566868> Silinen Kanal", kanal)
        .addField("<a:ayar:799711247087566868> Kanal Kategorisi", channel.parent)
        .addField("<a:ayar:799711247087566868> Kanal Türü", "Metin Kanalı")
        .setFooter(client.user.username,client.user.avatarURL())
        client.channels.cache.get(db.fetch(`kanallog.${channel.guild.id}`)).send(emb1)
        let z = channel.guild.channels.cache.get(kanal.id)
        z.setParent(z.guild.channels.cache.find(channel => channel.id === kategoriID))
        z.edit({position:sıra,topic:açıklama,nsfw:nsfw})
        db.set(`kanal2.${channel.guild.id}`,"1")
      })
    }}
    setTimeout(function() {
      db.delete(`kanal2.${channel.guild.id}`)},1000)
  })












  client.on("channelUpdate", async (oldChannel, newChannel) => {
    if(!db.has(`duzkanal.${newChannel.guild.id}`)) return;
    if(db.has(`kanalduz.${newChannel.guild.id}`)) return;
    const fetch = await oldChannel.guild.fetchAuditLogs({type: "CHANNEL_UPDATE"}).then(log => log.entries.first())
    let yapanad= fetch.executor;
    let guild = newChannel.guild;
    var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    let member = guild.members.cache.get(yapanad.id)
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
    if(oldChannel.type === "voice") {
      let kategoriID = oldChannel.parentID;
      let isim = oldChannel.name;
      let sıra = oldChannel.position;
      let limit = oldChannel.userLimit;
        const emb1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("BLUE")
      .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTitle(`Sunucuda Bir Kanal Düzenlendi`)
      .addField("<a:ayar:799711247087566868> Yetkili", yapanad)
      .addField("<a:ayar:799711247087566868> Düzenlenen Kanal", oldChannel.name)
      .addField("<a:ayar:799711247087566868> Kanal Kategorisi", oldChannel.parent)
      .addField("<a:ayar:799711247087566868> Kanal Türü", "Ses Kanalı")
      .setFooter(client.user.username,client.user.avatarURL())
      client.channels.cache.get(db.fetch(`kanallog.${newChannel.guild.id}`)).send(emb1)
        newChannel.setParent(newChannel.guild.channels.cache.find(channel => channel.id === kategoriID))
        newChannel.edit({position:sıra,userLimit:limit,name:isim})
        db.set(`kanalduz.${newChannel.guild.id}`,"1")
    }
    if(oldChannel.type === "text") {
      let açıklama = oldChannel.topic;
      let kategoriID = oldChannel.parentID;
      let isim = oldChannel.name;
      let sıra = oldChannel.position;
      let nsfw = oldChannel.nsfw;
        const emb1 = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor("BLUE")
        .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
        .setTitle(`Sunucuda Bir Kanal Düzenlendi`)
        .addField("<a:ayar:799711247087566868> Yetkili", yapanad)
        .addField("<a:ayar:799711247087566868> Düzenlenen Kanal", oldChannel)
        .addField("<a:ayar:799711247087566868> Kanal Kategorisi", oldChannel.parent)
        .addField("<a:ayar:799711247087566868> Kanal Türü", "Metin Kanalı")
        .setFooter(client.user.username,client.user.avatarURL())
        client.channels.cache.get(db.fetch(`kanallog.${newChannel.guild.id}`)).send(emb1)
        newChannel.setParent(newChannel.guild.channels.cache.find(channel => channel.id === kategoriID))
        newChannel.edit({position:sıra,topic:açıklama,nsfw:nsfw,name:isim})
        db.set(`kanalduz.${newChannel.guild.id}`,"1")
    }}
    setTimeout(function() {
    db.delete(`kanalduz.${newChannel.guild.id}`)},500)
  })










  client.on('channelCreate', async function(channel) {
    if(!db.has(`ackanal.${channel.guild.id}`)) return;
    if(db.has(`kanal2.${channel.guild.id}`)) return;
    const fetch = await channel.guild.fetchAuditLogs({type: "CHANNEL_CREATE"}).then(log => log.entries.first())
    let yapanad= fetch.executor;
    let guild = channel.guild;
    var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    if (yapanad.id === "758922896503472168") return;
    let member = guild.members.cache.get(yapanad.id)
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
    if(channel.type === "voice") {
      const emb1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("BLUE")
      .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTitle(`Sunucuda Bir Kanal Oluşturuldu`)
      .addField("<a:ayar:799711247087566868> Yetkili", yapanad)
      .addField("<a:ayar:799711247087566868> Açılan Kanal", channel.name)
      .addField("<a:ayar:799711247087566868> Kanal Kategorisi", channel.parent)
      .addField("<a:ayar:799711247087566868> Kanal Türü", "Ses Kanalı")
      .setFooter(client.user.username,client.user.avatarURL())
      client.channels.cache.get(db.fetch(`kanallog.${channel.guild.id}`)).send(emb1)
      channel.delete()
      db.set(`kanal1.${channel.guild.id}`,"1")
    }
    if(channel.type === "text") {
        const emb1 = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor("BLUE")
        .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
        .setTitle(`Sunucuda Bir Kanal Oluşturuldu`)
        .addField("<a:ayar:799711247087566868> Yetkili", yapanad)
        .addField("<a:ayar:799711247087566868> Açılan Kanal", channel.name)
        .addField("<a:ayar:799711247087566868> Kanal Kategorisi", channel.parent)
        .addField("<a:ayar:799711247087566868> Kanal Türü", "Metin Kanalı")
        .setFooter(client.user.username,client.user.avatarURL())
        client.channels.cache.get(db.fetch(`kanallog.${channel.guild.id}`)).send(emb1)
        channel.delete()
        db.set(`kanal1.${channel.guild.id}`,"1")
    }
    setTimeout(function() {
      db.delete(`kanal1.${channel.guild.id}`)},1000)
  }})


//----------------------------------------------------------------------------EMOJİ KORUMA-------------------------------------------------------------------
   
client.on('emojiDelete', async function(emoji) {
  if(!db.has(`silemo.${emoji.guild.id}`)) return;
  if(db.has(`emo1.${emoji.guild.id}`)) return;
  const fetch = await emoji.guild.fetchAuditLogs({type: "EMOJI_DELETE"}).then(log => log.entries.first())
  let yapanad= fetch.executor;
  let guild = emoji.guild;
  var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
  if (yapanad.id === "758922896503472168") return;
  let member = guild.members.cache.get(yapanad.id)
  if(guild.owner.id !== yapanad.id && !member.roles.cache.has(dokunulmaz)){
  member.roles.set("")
    let isim = emoji.name;
    var uzantı;
    if (emoji.animated){
      uzantı = "gif"
    } else {
      uzantı = "png"
    }
    const emb1 = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("BLUE")
    .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
    .setTitle(`Sunucuda Bir Emoji Silindi`)
    .addField("<a:ayar:799711247087566868> Yetkili", yapanad)
    .addField("<a:ayar:799711247087566868> Silinen Emoji", `${emoji.name}`)
    .setFooter(client.user.username,client.user.avatarURL())
    .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.${uzantı}?v=1`)
    client.channels.cache.get(db.fetch(`emolog.${guild.id}`)).send(emb1)
    emoji.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji.id}.${uzantı}?v=1`,emoji.name)
    db.set(`emo2.${guild.id}`,"1")
} 
  setTimeout(function() {
    db.delete(`emo2.${guild.id}`)},1000)
  })





  client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
    if(!db.has(`duzemo.${newEmoji.guild.id}`)) return;
    if(db.has(`emod1.${newEmoji.guild.id}`)) return;
    const fetch = await oldEmoji.guild.fetchAuditLogs({type: "EMOJI_UPDATE"}).then(log => log.entries.first())
    let yapanad= fetch.executor;
    let guild = newEmoji.guild;
    var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    let member = guild.members.cache.get(yapanad.id)
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
      let isim = oldEmoji.name;
      let sıra = oldEmoji.position;
      var uzantı;
      if (oldEmoji.animated){
        uzantı = "gif"
      } else {
        uzantı = "png"
      }
        const emb1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("BLUE")
      .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTitle(`Sunucuda Bir Emoji Düzenlendi`)
      .addField("<a:ayar:799711247087566868> Yetkili", yapanad)
      .addField("<a:ayar:799711247087566868> Emoji Adı", oldEmoji.name)
      .addField("<a:ayar:799711247087566868> Düzenlenmiş Emoji Adı", newEmoji.name)
      .setFooter(client.user.username,client.user.avatarURL())
      .setThumbnail(`https://cdn.discordapp.com/emojis/${newEmoji.id}.${uzantı}?v=1`)
      client.channels.cache.get(db.fetch(`emolog.${newEmoji.guild.id}`)).send(emb1)
        newEmoji.edit({position:sıra,name:isim})
        db.set(`emoduz.${newEmoji.guild.id}`,"1")
    }
    setTimeout(function() {
    db.delete(`emoduz.${newEmoji.guild.id}`)},500)
  })



  client.on('emojiCreate', async function(emoji) {
    if(!db.has(`acemo.${emoji.guild.id}`)) return;
    if(db.has(`emo2.${emoji.guild.id}`)) return;
    const fetch = await emoji.guild.fetchAuditLogs({type: "EMOJI_CREATE"}).then(log => log.entries.first())
    let yapanad= fetch.executor;
    let guild = emoji.guild;
    var dokunulmaz = db.fetch(`dokunulmaz.${guild.id}`)
    if (yapanad.id === "758922896503472168") return;
    let member = guild.members.cache.get(yapanad.id)
    var uzantı;
    if (emoji.animated){
      uzantı = "gif"
    } else {
      uzantı = "png"
    }
    if(guild.owner.id !== member.id && !member.roles.cache.has(dokunulmaz)){
      const emb1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("BLUE")
      .setAuthor(guild.name, guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
      .setTitle(`Sunucuda Bir Emoji Oluşturuldu`)
      .addField("<a:ayar:799711247087566868> Yetkili", yapanad)
      .addField("<a:ayar:799711247087566868> Emoji Adı", emoji.name)
      .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.${uzantı}?v=1`)
      .setFooter(client.user.username,client.user.avatarURL())
      client.channels.cache.get(db.fetch(`emolog.${emoji.guild.id}`)).send(emb1)
      emoji.delete()
      db.set(`emo1.${emoji.guild.id}`,"1")
    }    setTimeout(function() {
      db.delete(`emo1.${emoji.guild.id}`)},500)
    })

//---------------------------------------------------------------BOT KORUMA---------------------------------------------------------------

client.on("guildMemberAdd", async member => {
  if (!db.has(`botkoruma_${member.guild.id}`)) return;
  if (!member.user.bot) return;
  if (!db.has(`izinlibot_${member.id}_${member.guild.id}`)){
  const e2321 = new Discord.MessageEmbed()
  .setTimestamp()
  .setColor("BLUE")
  .setAuthor(member.guild.name, member.guild.iconURL({dynamic: true,format: "gif",format: "png",format: "jpg",size: 2048}))
  .setTitle(`Sunucuya Bir Bot Katıldı.`)
  .addField("<a:ayar:799711247087566868> Katılan Bot :", member.user.tag)
  .addField("<a:ayar:799711247087566868> Katılan Bot ID :", member.id)
  .addField("<a:ayar:799711247087566868> Bot İzin Komutu :", `t!bot-izin ${member.id}`)
  .setThumbnail(member.user.avatarURL())
  .setFooter(client.user.username,client.user.avatarURL())
  member.kick(member, `Bot koruma nedeniyle kicklendi.`)
  member.guild.owner.send(e2321)
}else {
  db.delete(`izinlibot_${member.id}_${member.guild.id}`)
}
})


//---------------------------------Gir - çık-----------------------------------------------
client.on("guildCreate", (guild,bot) => {
  let log = client.channels.cache.get("765690118576930837");
  const embed = new Discord.MessageEmbed()
    .setAuthor("Yeni bir sunucuya eklendim!")
    .setThumbnail(guild.iconURL())
    .setColor("BLUE")
    .addField("<a:ayar:799711247087566868> Sunucu İsmi:", guild.name)
    .addField("<a:ayar:799711247087566868> Sunucu ID:", guild.id)
    .addField("<a:ayar:799711247087566868> Sunucu Sahibi:", guild.owner)
    .addField("<a:ayar:799711247087566868> Sunucu Bölgesi:", guild.region)
    .addField("<a:ayar:799711247087566868> Sunucu Üye Sayısı:", guild.members.cache.size)
    .addField("<a:ayar:799711247087566868> Sunucu Kanal Sayısı:", guild.channels.cache.size)
    .addField("<a:ayar:799711247087566868> Sunucu Rol Sayısı:", guild.roles.cache.size)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed);
});


client.on("guildDelete", (guild,bot) => {
  let log = client.channels.cache.get("765698521785434152");
  const embed = new Discord.MessageEmbed()
    .setAuthor("Bir sunucudan atıldım!")
    .setThumbnail(guild.iconURL())
    .setColor("BLUE")
    .addField("<a:ayar:799711247087566868> Sunucu İsmi:", guild.name)
    .addField("<a:ayar:799711247087566868> Sunucu ID:", guild.id)
    .addField("<a:ayar:799711247087566868> Sunucu Sahibi:", guild.owner)
    .addField("<a:ayar:799711247087566868> Sunucu Bölgesi:", guild.region)
    .addField("<a:ayar:799711247087566868> Sunucu Üye Sayısı:", guild.members.cache.size)
    .addField("<a:ayar:799711247087566868> Sunucu Kanal Sayısı:", guild.channels.cache.size)
    .addField("<a:ayar:799711247087566868> Sunucu Rol Sayısı:", guild.roles.cache.size)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed)
db.delete(`botkoruma_${guild.id}`)
db.delete(`acemo.${guild.id}`)
db.delete(`duzemo.${guild.id}`)
db.delete(`emolog.${guild.id}`)
db.delete(`silemo.${guild.id}`)
db.delete(`duzkanal.${guild.id}`)
db.delete(`silkanal.${guild.id}`)
db.delete(`ackanal.${guild.id}`)
db.delete(`kanallog.${guild.id}`)
db.delete(`msglog.${guild.id}`)
db.delete(`duzrol.${guild.id}`)
db.delete(`acrol.${guild.id}`)
db.delete(`silrol.${guild.id}`)
db.delete(`rollog.${guild.id}`)
db.delete(`dokunulmaz.${guild.id}`)
db.delete(`yetkili.${guild.id}`)
});
//if(message.member.permissions.has('ADMINISTRATOR')) return;
//if(message.guild.owner.id === message.member.id) return;
//if(message.member.roles.cache.has(db.fetch(`dokunulmaz.${message.guild.id}`)))


client.on("message", message => {
  const args = message.content.split(" ").slice(1);
 const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  if (message.content.startsWith(ayarlar.prefix + "eval")) {
    if(message.author.id !== ayarlar.sahip) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

/////////////////// KÜFÜR ENGEL

client.on("message", async message => {
  const lus = await db.fetch(`kufurE_${message.guild.id}`);
  if (lus) {
    const küfür = [
      "abaza",
      "abazan",
      "aq",
      "ağzınasıçayım",
      "ahmak",
      "am",
      "amarım",
      "ambiti",
      "OC",
      "0C",
      "ambiti",
      "amcığı",
      "amcığın",
      "amcığını",
      "amcığınızı",
      "amcık",
      "amcıkhoşafı",
      "amcıklama",
      "amcıklandı",
      "amcik",
      "amck",
      "amckl",
      "amcklama",
      "amcklaryla",
      "amckta",
      "amcktan",
      "amcuk",
      "amık",
      "amına",
      "amınako",
      "amınakoy",
      "amınakoyarım",
      "amınakoyayım",
      "amınakoyim",
      "amınakoyyim",
      "amınas",
      "amınasikem",
      "amınasokam",
      "amınferyadı",
      "amını",
      "amınıs",
      "amınoglu",
      "amınoğlu",
      "amınoğli",
      "amısına",
      "amısını",
      "amina",
      "aminakoyarim",
      "aminakoyayım",
      "aminakoyayim",
      "aminakoyim",
      "aminda",
      "amindan",
      "amindayken",
      "amini",
      "aminiyarraaniskiim",
      "aminoglu",
      "aminoglu",
      "amiyum",
      "amk",
      "amkafa",
      "amkçocuğu",
      "amlarnzn",
      "amlı",
      "amm",
      "amna",
      "amnda",
      "amndaki",
      "amngtn",
      "amnn",
      "amq",
      "amsız",
      "amsiz",
      "amuna",
      "ana",
      "anaaann",
      "anal",
      "anan",
      "anana",
      "anandan",
      "ananı",
      "ananı",
      "ananın",
      "ananınam",
      "ananınamı",
      "ananındölü",
      "ananınki",
      "ananısikerim",
      "ananısikerim",
      "ananısikeyim",
      "ananısikeyim",
      "ananızın",
      "ananızınam",
      "anani",
      "ananin",
      "ananisikerim",
      "ananisikerim",
      "ananisikeyim",
      "ananisikeyim",
      "anann",
      "ananz",
      "anas",
      "anasını",
      "anasınınam",
      "anasıorospu",
      "anasi",
      "anasinin",
      "angut",
      "anneni",
      "annenin",
      "annesiz",
      "aptal",
      "aq",
      "a.q",
      "a.q.",
      "aq.",
      "atkafası",
      "atmık",
      "avrat",
      "babaannesikaşar",
      "babanı",
      "babanın",
      "babani",
      "babasıpezevenk",
      "bacına",
      "bacını",
      "bacının",
      "bacini",
      "bacn",
      "bacndan",
      "bitch",
      "bok",
      "boka",
      "bokbok",
      "bokça",
      "bokkkumu",
      "boklar",
      "boktan",
      "boku",
      "bokubokuna",
      "bokum",
      "bombok",
      "boner",
      "bosalmak",
      "boşalmak",
      "çük",
      "dallama",
      "daltassak",
      "dalyarak",
      "dalyarrak",
      "dangalak",
      "dassagi",
      "diktim",
      "dildo",
      "dingil",
      "dingilini",
      "dinsiz",
      "dkerim",
      "domal",
      "domalan",
      "domaldı",
      "domaldın",
      "domalık",
      "domalıyor",
      "domalmak",
      "domalmış",
      "domalsın",
      "domalt",
      "domaltarak",
      "domaltıp",
      "domaltır",
      "domaltırım",
      "domaltip",
      "domaltmak",
      "dölü",
      "eben",
      "ebeni",
      "ebenin",
      "ebeninki",
      "ecdadını",
      "ecdadini",
      "embesil",
      "fahise",
      "fahişe",
      "feriştah",
      "ferre",
      "fuck",
      "fucker",
      "fuckin",
      "fucking",
      "gavad",
      "gavat",
      "geber",
      "geberik",
      "gebermek",
      "gebermiş",
      "gebertir",
      "gerızekalı",
      "gerizekalı",
      "gerizekali",
      "gerzek",
      "gotlalesi",
      "gotlu",
      "gotten",
      "gotundeki",
      "gotunden",
      "gotune",
      "gotunu",
      "gotveren",
      "göt",
      "götdeliği",
      "götherif",
      "götlalesi",
      "götlek",
      "götoğlanı",
      "götoğlanı",
      "götoş",
      "götten",
      "götü",
      "götün",
      "götüne",
      "götünekoyim",
      "götünekoyim",
      "götünü",
      "götveren",
      "götveren",
      "götverir",
      "gtveren",
      "hasiktir",
      "hassikome",
      "hassiktir",
      "hassiktir",
      "hassittir",
      "ibine",
      "ibinenin",
      "ibne",
      "ibnedir",
      "ibneleri",
      "ibnelik",
      "ibnelri",
      "ibneni",
      "ibnenin",
      "ibnesi",
      "ipne",
      "itoğluit",
      "kahpe",
      "kahpenin",
      "kaka",
      "kaltak",
      "kancık",
      "kancik",
      "kappe",
      "kavat",
      "kavatn",
      "kocagöt",
      "koduğmunun",
      "kodumun",
      "kodumunun",
      "koduumun",
      "mal",
      "malafat",
      "malak",
      "manyak",
      "meme",
      "memelerini",
      "oc",
      "ocuu",
      "ocuun",
      "0Ç",
      "o.çocuğu",
      "orosbucocuu",
      "orospu",
      "orospucocugu",
      "orospuçoc",
      "orospuçocuğu",
      "orospuçocuğudur",
      "orospuçocukları",
      "orospudur",
      "orospular",
      "orospunun",
      "orospununevladı",
      "orospuydu",
      "orospuyuz",
      "orrospu",
      "oruspu",
      "oruspuçocuğu",
      "oruspuçocuğu",
      "osbir",
      "öküz",
      "penis",
      "pezevek",
      "pezeven",
      "pezeveng",
      "pezevengi",
      "pezevenginevladı",
      "pezevenk",
      "pezo",
      "pic",
      "pici",
      "picler",
      "piç",
      "piçinoğlu",
      "piçkurusu",
      "piçler",
      "pipi",
      "pisliktir",
      "porno",
      "pussy",
      "puşt",
      "puşttur",
      "s1kerim",
      "s1kerm",
      "s1krm",
      "sakso",
      "salaak",
      "salak",
      "serefsiz",
      "sexs",
      "sıçarım",
      "sıçtığım",
      "sıkecem",
      "sicarsin",
      "sie",
      "sik",
      "sikdi",
      "sikdiğim",
      "sike",
      "sikecem",
      "sikem",
      "siken",
      "sikenin",
      "siker",
      "sikerim",
      "sikerler",
      "sikersin",
      "sikertir",
      "sikertmek",
      "sikesen",
      "sikey",
      "sikeydim",
      "sikeyim",
      "sikeym",
      "siki",
      "sikicem",
      "sikici",
      "sikien",
      "sikienler",
      "sikiiim",
      "sikiiimmm",
      "sikiim",
      "sikiir",
      "sikiirken",
      "sikik",
      "sikil",
      "sikildiini",
      "sikilesice",
      "sikilmi",
      "sikilmie",
      "sikilmis",
      "sikilmiş",
      "sikilsin",
      "sikim",
      "sikimde",
      "sikimden",
      "sikime",
      "sikimi",
      "sikimiin",
      "sikimin",
      "sikimle",
      "sikimsonik",
      "sikimtrak",
      "sikin",
      "sikinde",
      "sikinden",
      "sikine",
      "sikini",
      "sikip",
      "sikis",
      "sikisek",
      "sikisen",
      "sikish",
      "sikismis",
      "sikiş",
      "sikişen",
      "sikişme",
      "sikitiin",
      "sikiyim",
      "sikiym",
      "sikiyorum",
      "sikkim",
      "sikleri",
      "sikleriii",
      "sikli",
      "sikm",
      "sikmek",
      "sikmem",
      "sikmiler",
      "sikmisligim",
      "siksem",
      "sikseydin",
      "sikseyidin",
      "siksin",
      "siksinler",
      "siksiz",
      "siksok",
      "siksz",
      "sikti",
      "siktigimin",
      "siktigiminin",
      "siktiğim",
      "siktiğimin",
      "siktiğiminin",
      "siktii",
      "siktiim",
      "siktiimin",
      "siktiiminin",
      "siktiler",
      "siktim",
      "siktimin",
      "siktiminin",
      "siktir",
      "siktiret",
      "siktirgit",
      "siktirgit",
      "siktirir",
      "siktiririm",
      "siktiriyor",
      "siktirlan",
      "siktirolgit",
      "sittimin",
      "skcem",
      "skecem",
      "skem",
      "sker",
      "skerim",
      "skerm",
      "skeyim",
      "skiim",
      "skik",
      "skim",
      "skime",
      "skmek",
      "sksin",
      "sksn",
      "sksz",
      "sktiimin",
      "sktrr",
      "skyim",
      "slaleni",
      "sokam",
      "sokarım",
      "sokarim",
      "sokarm",
      "sokarmkoduumun",
      "sokayım",
      "sokaym",
      "sokiim",
      "soktuğumunun",
      "sokuk",
      "sokum",
      "sokuş",
      "sokuyum",
      "soxum",
      "sulaleni",
      "sülalenizi",
      "tasak",
      "tassak",
      "taşak",
      "taşşak",
      "s.k",
      "s.keyim",
      "vajina",
      "vajinanı",
      "xikeyim",
      "yaaraaa",
      "yalarım",
      "yalarun",
      "orospi",
      "orospinin",
      "orospının",
      "orospı",
      "yaraaam",
      "yarak",
      "yaraksız",
      "yaraktr",
      "yaram",
      "yaraminbasi",
      "yaramn",
      "yararmorospunun",
      "yarra",
      "yarraaaa",
      "yarraak",
      "yarraam",
      "yarraamı",
      "yarragi",
      "yarragimi",
      "yarragina",
      "yarragindan",
      "yarragm",
      "yarrağ",
      "yarrağım",
      "yarrağımı",
      "yarraimin",
      "yarrak",
      "yarram",
      "yarramin",
      "yarraminbaşı",
      "yarramn",
      "yarran",
      "yarrana",
      "yarrrak",
      "yavak",
      "yavş",
      "yavşak",
      "yavşaktır",
      "yrrak",
      "zigsin",
      "zikeyim",
      "zikiiim",
      "zikiim",
      "zikik",
      "zikim",
      "ziksiin",
      "ağzına",
      "am",
      "mk",
      "amcık",
      "amcıkağız",
      "amcıkları",
      "amık",
      "amın",
      "amına",
      "amınakoyim",
      "amınoğlu",
      "amina",
      "amini",
      "amk",
      "amq",
      "anan",
      "ananı",
      "ananızı",
      "ananizi",
      "aminizi",
      "aminii",
      "avradını",
      "avradini",
      "anasını",
      "b.k",
      "bok",
      "boktan",
      "boşluk",
      "dalyarak",
      "dasak",
      "dassak",
      "daşak",
      "daşşak",
      "daşşaksız",
      "durum",
      "ensest",
      "erotik",
      "fahişe",
      "fuck",
      "g*t",
      "g*tü",
      "g*tün",
      "g*tüne",
      "g.t",
      "gavat",
      "gay",
      "gerızekalıdır",
      "gerizekalı",
      "gerizekalıdır",
      "got",
      "gotunu",
      "gotuze",
      "göt",
      "götü",
      "götüne",
      "götünü",
      "götünüze",
      "götüyle",
      "götveren",
      "götvern",
      "guat",
      "hasiktir",
      "hasiktr",
      "hastir",
      "i.ne",
      "ibne",
      "ibneler",
      "ibneliği",
      "ipne",
      "ipneler",
      "it",
      "iti",
      "itler",
      "kavat",
      "kıç",
      "kıro",
      "kromusunuz",
      "kromusunuz",
      "lezle",
      "lezler",
      "nah",
      "o.ç",
      "oç.",
      "okuz",
      "orosbu",
      "orospu",
      "orospucocugu",
      "orospular",
      "otusbir",
      "otuzbir",
      "öküz",
      "penis",
      "pezevenk",
      "pezevenkler",
      "pezo",
      "pic",
      "piç",
      "piçi",
      "piçinin",
      "piçler",
      "pis",
      "pok",
      "pokunu",
      "porn",
      "porno",
      "puşt",
      "sex",
      "s.tir",
      "sakso",
      "salak",
      "sanane",
      "sanane",
      "sçkik",
      "seks",
      "serefsiz",
      "serefsz",
      "serefszler",
      "sex",
      "sıçmak",
      "sıkerım",
      "sıkm",
      "sıktır",
      "si.çmak",
      "sicmak",
      "sicti",
      "sik",
      "sikenin",
      "siker",
      "sikerim",
      "sikerler",
      "sikert",
      "sikertirler",
      "sikertmek",
      "sikeyim",
      "sikicem",
      "sikiim",
      "sikik",
      "sikim",
      "sikime",
      "sikimi",
      "sikiş",
      "sikişken",
      "sikişmek",
      "sikm",
      "sikmeyi",
      "siksinler",
      "siktiğim",
      "siktimin",
      "siktin",
      "siktirgit",
      "siktir",
      "siktirgit",
      "siktirsin",
      "siqem",
      "skiym",
      "skm",
      "skrm",
      "sktim",
      "sktir",
      "sktirsin",
      "sktr",
      "sktroradan",
      "sktrsn",
      "snane",
      "sokacak",
      "sokarim",
      "sokayım",
      "sülaleni",
      "şerefsiz",
      "şerefsizler",
      "şerefsizlerin",
      "şerefsizlik",
      "tasak",
      "tassak",
      "taşak",
      "taşşak",
      "travesti",
      "yarak",
      "yark",
      "yarrağım",
      "yarrak",
      "yarramın",
      "yarrk",
      "yavşak",
      "yrak",
      "yrk",
      "ebenin",
      "ezik",
      "o.ç.",
      "orospu",
      "öküz",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "salak",
      "serefsiz",
      "sik",
      "sperm",
      "bok",
      "aq",
      "a.q.",
      "amk",
      "am",
      "amına",
      "ebenin",
      "ezik",
      "fahişe",
      "gavat",
      "gavurundölü",
      "gerizekalı",
      "göte",
      "götü",
      "götüne",
      "götünü",
      "lan",
      "mal",
      "o.ç.",
      "orospu",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "salak",
      "serefsiz",
      "sik",
      "sikkırığı",
      "sikerler",
      "sikertmek",
      "sikik",
      "sikilmiş",
      "siktir",
      "sperm",
      "taşak",
      "totoş",
      "yarak",
      "yarrak",
      "bok",
      "aq",
      "a.q.",
      "amk",
      "am",
      "ebenin",
      "fahişe",
      "gavat",
      "gerizakalı",
      "gerizekalı",
      "göt",
      "göte",
      "götü",
      "götüne",
      "götsün",
      "piçsin",
      "götsünüz",
      "piçsiniz",
      "götünüze",
      "kıçınız",
      "kıçınıza",
      "götünü",
      "hayvan",
      "ibne",
      "ipne",
      "kahpe",
      "kaltak",
      "lan",
      "mal",
      "o.c",
      "oc",
      "manyak",
      "o.ç.",
      "oç",
      "orospu",
      "öküz",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "serefsiz",
      "sik",
      "sikkırığı",
      "sikerler",
      "sikertmek",
      "sikik",
      "sikiim",
      "siktim",
      "siki",
      "sikilmiş",
      "siktir",
      "siktir",
      "sperm",
      "şerefsiz",
      "taşak",
      "totoş",
      "yarak",
      "yarrak",
      "yosma",
      "aq",
      "a.q.",
      "amk",
      "amına",
      "amınakoyim",
      "amina",
      "ammına",
      "amna",
      "sikim",
      "sikiym",
      "sikeyim",
      "siktr",
      "kodumun",
      "amık",
      "sikem",
      "sikim",
      "sikiym",
      "s.iktm",
      "s.ikerim",
      "s.ktir",
      "amg",
      "am.k",
      "a.mk",
      "amık",
      "rakı",
      "rak",
      "oruspu",
      "oc",
      "ananın",
      "ananınki",
      "bacının",
      "bacını",
      "babanın",
      "sike",
      "skim",
      "skem",
      "amcık",
      "şerefsiz",
      "piç",
      "piçinoğlu",
      "amcıkhoşafı",
      "amınasokam",
      "amkçocuğu",
      "amınferyadı",
      "amınoglu",
      "piçler",
      "sikerim",
      "sikeyim",
      "siktiğim",
      "siktiğimin",
      "amını",
      "amına",
      "amınoğlu",
      "amk",
      "ipne",
      "ibne",
      "serefsiz",
      "şerefsiz",
      "piç",
      "piçkurusu",
      "götün",
      "götoş",
      "yarrak",
      "amcik",
      "sıçarım",
      "sıçtığım",
      "aq",
      "a.q",
      "a.q.",
      "aq.",
      "a.g.",
      "ag.",
      "amınak",
      "aminak",
      "amınag",
      "aminag",
      "amınıs",
      "amınas",
      "ananı",
      "babanı",
      "anani",
      "babani",
      "bacını",
      "bacini",
      "ecdadını",
      "ecdadini",
      "sikeyim",
      "sulaleni",
      "sülaleni",
      "dallama",
      "dangalak",
      "aptal",
      "salak",
      "gerızekalı",
      "gerizekali",
      "öküz",
      "angut",
      "dalyarak",
      "sikiyim",
      "sikeyim",
      "götüne",
      "götünü",
      "siktirgit",
      "siktirgit",
      "siktirolgit",
      "siktirolgit",
      "siktir",
      "hasiktir",
      "hassiktir",
      "hassiktir",
      "dalyarak",
      "dalyarrak",
      "kancık",
      "kancik",
      "kaltak",
      "orospu",
      "oruspu",
      "fahişe",
      "fahise",
      "pezevenk",
      "pezo",
      "kocagöt",
      "ambiti",
      "götünekoyim",
      "götünekoyim",
      "amınakoyim",
      "aminakoyim",
      "amınak",
      "aminakoyayım",
      "aminakoyayim",
      "amınakoyarım",
      "aminakoyarim",
      "aminakoyarim",
      "ananısikeyim",
      "ananisikeyim",
      "ananısikeyim",
      "ananisikeyim",
      "ananisikerim",
      "ananısikerim",
      "ananisikerim",
      "ananısikerim",
      "orospucocugu",
      "oruspucocu",
      "amk",
      "amq",
      "sikik",
      "götveren",
      "götveren",
      "amınoğlu",
      "aminoglu",
      "amınoglu",
      "gavat",
      "kavat",
      "anneni",
      "annenin",
      "ananın",
      "ananin",
      "dalyarak",
      "sikik",
      "amcık",
      "siktir",
      "piç",
      "pic",
      "sie",
      "yarram",
      "göt",
      "meme",
      "dildo",
      "skcem",
      "skerm",
      "skerim",
      "skecem",
      "orrospu",
      "annesiz",
      "kahpe",
      "kappe",
      "yarak",
      "yaram",
      "dalaksız",
      "yaraksız",
      "amlı",
      "s1kerim",
      "s1kerm",
      "s1krm",
      "sikim",
      "orospuçocukları",
      "oç"
    ];
    if (küfür.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has("BAN_MEMBERS")) {
          message.delete();

          return message.channel
            .send(`**Hey ${message.author} Dur! Bu Sunucuda Küfür Yasak!**`)
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});
client.on("messageUpdate", async (newMessage, oldMessage) => {
  const lus = await db.fetch(`kufurE_${newMessage.guild.id}`);
  if (lus) {
    const küfür = [
      "abaza",
      "abazan",
      "aq",
      "ağzınasıçayım",
      "ahmak",
      "am",
      "amarım",
      "ambiti",
      "OC",
      "0C",
      "ambiti",
      "amcığı",
      "amcığın",
      "amcığını",
      "amcığınızı",
      "amcık",
      "amcıkhoşafı",
      "amcıklama",
      "amcıklandı",
      "amcik",
      "amck",
      "amckl",
      "amcklama",
      "amcklaryla",
      "amckta",
      "amcktan",
      "amcuk",
      "amık",
      "amına",
      "amınako",
      "amınakoy",
      "amınakoyarım",
      "amınakoyayım",
      "amınakoyim",
      "amınakoyyim",
      "amınas",
      "amınasikem",
      "amınasokam",
      "amınferyadı",
      "amını",
      "amınıs",
      "amınoglu",
      "amınoğlu",
      "amınoğli",
      "amısına",
      "amısını",
      "amina",
      "aminakoyarim",
      "aminakoyayım",
      "aminakoyayim",
      "aminakoyim",
      "aminda",
      "amindan",
      "amindayken",
      "amini",
      "aminiyarraaniskiim",
      "aminoglu",
      "aminoglu",
      "amiyum",
      "amk",
      "amkafa",
      "amkçocuğu",
      "amlarnzn",
      "amlı",
      "amm",
      "amna",
      "amnda",
      "amndaki",
      "amngtn",
      "amnn",
      "amq",
      "amsız",
      "amsiz",
      "amuna",
      "ana",
      "anaaann",
      "anal",
      "anan",
      "anana",
      "anandan",
      "ananı",
      "ananı",
      "ananın",
      "ananınam",
      "ananınamı",
      "ananındölü",
      "ananınki",
      "ananısikerim",
      "ananısikerim",
      "ananısikeyim",
      "ananısikeyim",
      "ananızın",
      "ananızınam",
      "anani",
      "ananin",
      "ananisikerim",
      "ananisikerim",
      "ananisikeyim",
      "ananisikeyim",
      "anann",
      "ananz",
      "anas",
      "anasını",
      "anasınınam",
      "anasıorospu",
      "anasi",
      "anasinin",
      "angut",
      "anneni",
      "annenin",
      "annesiz",
      "aptal",
      "aq",
      "a.q",
      "a.q.",
      "aq.",
      "atkafası",
      "atmık",
      "avrat",
      "babaannesikaşar",
      "babanı",
      "babanın",
      "babani",
      "babasıpezevenk",
      "bacına",
      "bacını",
      "bacının",
      "bacini",
      "bacn",
      "bacndan",
      "bitch",
      "bok",
      "boka",
      "bokbok",
      "bokça",
      "bokkkumu",
      "boklar",
      "boktan",
      "boku",
      "bokubokuna",
      "bokum",
      "bombok",
      "boner",
      "bosalmak",
      "boşalmak",
      "çük",
      "dallama",
      "daltassak",
      "dalyarak",
      "dalyarrak",
      "dangalak",
      "dassagi",
      "diktim",
      "dildo",
      "dingil",
      "dingilini",
      "dinsiz",
      "dkerim",
      "domal",
      "domalan",
      "domaldı",
      "domaldın",
      "domalık",
      "domalıyor",
      "domalmak",
      "domalmış",
      "domalsın",
      "domalt",
      "domaltarak",
      "domaltıp",
      "domaltır",
      "domaltırım",
      "domaltip",
      "domaltmak",
      "dölü",
      "eben",
      "ebeni",
      "ebenin",
      "ebeninki",
      "ecdadını",
      "ecdadini",
      "embesil",
      "fahise",
      "fahişe",
      "feriştah",
      "ferre",
      "fuck",
      "fucker",
      "fuckin",
      "fucking",
      "gavad",
      "gavat",
      "geber",
      "geberik",
      "gebermek",
      "gebermiş",
      "gebertir",
      "gerızekalı",
      "gerizekalı",
      "gerizekali",
      "gerzek",
      "gotlalesi",
      "gotlu",
      "gotten",
      "gotundeki",
      "gotunden",
      "gotune",
      "gotunu",
      "gotveren",
      "göt",
      "götdeliği",
      "götherif",
      "götlalesi",
      "götlek",
      "götoğlanı",
      "götoğlanı",
      "götoş",
      "götten",
      "götü",
      "götün",
      "götüne",
      "götünekoyim",
      "götünekoyim",
      "götünü",
      "götveren",
      "götveren",
      "götverir",
      "gtveren",
      "hasiktir",
      "hassikome",
      "hassiktir",
      "hassiktir",
      "hassittir",
      "ibine",
      "ibinenin",
      "ibne",
      "ibnedir",
      "ibneleri",
      "ibnelik",
      "ibnelri",
      "ibneni",
      "ibnenin",
      "ibnesi",
      "ipne",
      "itoğluit",
      "kahpe",
      "kahpenin",
      "kaka",
      "kaltak",
      "kancık",
      "kancik",
      "kappe",
      "kavat",
      "kavatn",
      "kocagöt",
      "koduğmunun",
      "kodumun",
      "kodumunun",
      "koduumun",
      "mal",
      "malafat",
      "malak",
      "manyak",
      "meme",
      "memelerini",
      "oc",
      "ocuu",
      "ocuun",
      "0Ç",
      "o.çocuğu",
      "orosbucocuu",
      "orospu",
      "orospucocugu",
      "orospuçoc",
      "orospuçocuğu",
      "orospuçocuğudur",
      "orospuçocukları",
      "orospudur",
      "orospular",
      "orospunun",
      "orospununevladı",
      "orospuydu",
      "orospuyuz",
      "orrospu",
      "oruspu",
      "oruspuçocuğu",
      "oruspuçocuğu",
      "osbir",
      "öküz",
      "penis",
      "pezevek",
      "pezeven",
      "pezeveng",
      "pezevengi",
      "pezevenginevladı",
      "pezevenk",
      "pezo",
      "pic",
      "pici",
      "picler",
      "piç",
      "piçinoğlu",
      "piçkurusu",
      "piçler",
      "pipi",
      "pisliktir",
      "porno",
      "pussy",
      "puşt",
      "puşttur",
      "s1kerim",
      "s1kerm",
      "s1krm",
      "sakso",
      "salaak",
      "salak",
      "serefsiz",
      "sexs",
      "sıçarım",
      "sıçtığım",
      "sıkecem",
      "sicarsin",
      "sie",
      "sik",
      "sikdi",
      "sikdiğim",
      "sike",
      "sikecem",
      "sikem",
      "siken",
      "sikenin",
      "siker",
      "sikerim",
      "sikerler",
      "sikersin",
      "sikertir",
      "sikertmek",
      "sikesen",
      "sikey",
      "sikeydim",
      "sikeyim",
      "sikeym",
      "siki",
      "sikicem",
      "sikici",
      "sikien",
      "sikienler",
      "sikiiim",
      "sikiiimmm",
      "sikiim",
      "sikiir",
      "sikiirken",
      "sikik",
      "sikil",
      "sikildiini",
      "sikilesice",
      "sikilmi",
      "sikilmie",
      "sikilmis",
      "sikilmiş",
      "sikilsin",
      "sikim",
      "sikimde",
      "sikimden",
      "sikime",
      "sikimi",
      "sikimiin",
      "sikimin",
      "sikimle",
      "sikimsonik",
      "sikimtrak",
      "sikin",
      "sikinde",
      "sikinden",
      "sikine",
      "sikini",
      "sikip",
      "sikis",
      "sikisek",
      "sikisen",
      "sikish",
      "sikismis",
      "sikiş",
      "sikişen",
      "sikişme",
      "sikitiin",
      "sikiyim",
      "sikiym",
      "sikiyorum",
      "sikkim",
      "sikleri",
      "sikleriii",
      "sikli",
      "sikm",
      "sikmek",
      "sikmem",
      "sikmiler",
      "sikmisligim",
      "siksem",
      "sikseydin",
      "sikseyidin",
      "siksin",
      "siksinler",
      "siksiz",
      "siksok",
      "siksz",
      "sikti",
      "siktigimin",
      "siktigiminin",
      "siktiğim",
      "siktiğimin",
      "siktiğiminin",
      "siktii",
      "siktiim",
      "siktiimin",
      "siktiiminin",
      "siktiler",
      "siktim",
      "siktimin",
      "siktiminin",
      "siktir",
      "siktiret",
      "siktirgit",
      "siktirgit",
      "siktirir",
      "siktiririm",
      "siktiriyor",
      "siktirlan",
      "siktirolgit",
      "sittimin",
      "skcem",
      "skecem",
      "skem",
      "sker",
      "skerim",
      "skerm",
      "skeyim",
      "skiim",
      "skik",
      "skim",
      "skime",
      "skmek",
      "sksin",
      "sksn",
      "sksz",
      "sktiimin",
      "sktrr",
      "skyim",
      "slaleni",
      "sokam",
      "sokarım",
      "sokarim",
      "sokarm",
      "sokarmkoduumun",
      "sokayım",
      "sokaym",
      "sokiim",
      "soktuğumunun",
      "sokuk",
      "sokum",
      "sokuş",
      "sokuyum",
      "soxum",
      "sulaleni",
      "sülalenizi",
      "tasak",
      "tassak",
      "taşak",
      "taşşak",
      "s.k",
      "s.keyim",
      "vajina",
      "vajinanı",
      "xikeyim",
      "yaaraaa",
      "yalarım",
      "yalarun",
      "orospi",
      "orospinin",
      "orospının",
      "orospı",
      "yaraaam",
      "yarak",
      "yaraksız",
      "yaraktr",
      "yaram",
      "yaraminbasi",
      "yaramn",
      "yararmorospunun",
      "yarra",
      "yarraaaa",
      "yarraak",
      "yarraam",
      "yarraamı",
      "yarragi",
      "yarragimi",
      "yarragina",
      "yarragindan",
      "yarragm",
      "yarrağ",
      "yarrağım",
      "yarrağımı",
      "yarraimin",
      "yarrak",
      "yarram",
      "yarramin",
      "yarraminbaşı",
      "yarramn",
      "yarran",
      "yarrana",
      "yarrrak",
      "yavak",
      "yavş",
      "yavşak",
      "yavşaktır",
      "yrrak",
      "zigsin",
      "zikeyim",
      "zikiiim",
      "zikiim",
      "zikik",
      "zikim",
      "ziksiin",
      "ağzına",
      "am",
      "mk",
      "amcık",
      "amcıkağız",
      "amcıkları",
      "amık",
      "amın",
      "amına",
      "amınakoyim",
      "amınoğlu",
      "amina",
      "amini",
      "amk",
      "amq",
      "anan",
      "ananı",
      "ananızı",
      "ananizi",
      "aminizi",
      "aminii",
      "avradını",
      "avradini",
      "anasını",
      "b.k",
      "bok",
      "boktan",
      "boşluk",
      "dalyarak",
      "dasak",
      "dassak",
      "daşak",
      "daşşak",
      "daşşaksız",
      "durum",
      "ensest",
      "erotik",
      "fahişe",
      "fuck",
      "g*t",
      "g*tü",
      "g*tün",
      "g*tüne",
      "g.t",
      "gavat",
      "gay",
      "gerızekalıdır",
      "gerizekalı",
      "gerizekalıdır",
      "got",
      "gotunu",
      "gotuze",
      "göt",
      "götü",
      "götüne",
      "götünü",
      "götünüze",
      "götüyle",
      "götveren",
      "götvern",
      "guat",
      "hasiktir",
      "hasiktr",
      "hastir",
      "i.ne",
      "ibne",
      "ibneler",
      "ibneliği",
      "ipne",
      "ipneler",
      "it",
      "iti",
      "itler",
      "kavat",
      "kıç",
      "kıro",
      "kromusunuz",
      "kromusunuz",
      "lezle",
      "lezler",
      "nah",
      "o.ç",
      "oç.",
      "okuz",
      "orosbu",
      "orospu",
      "orospucocugu",
      "orospular",
      "otusbir",
      "otuzbir",
      "öküz",
      "penis",
      "pezevenk",
      "pezevenkler",
      "pezo",
      "pic",
      "piç",
      "piçi",
      "piçinin",
      "piçler",
      "pis",
      "pok",
      "pokunu",
      "porn",
      "porno",
      "puşt",
      "sex",
      "s.tir",
      "sakso",
      "salak",
      "sanane",
      "sanane",
      "sçkik",
      "seks",
      "serefsiz",
      "serefsz",
      "serefszler",
      "sex",
      "sıçmak",
      "sıkerım",
      "sıkm",
      "sıktır",
      "si.çmak",
      "sicmak",
      "sicti",
      "sik",
      "sikenin",
      "siker",
      "sikerim",
      "sikerler",
      "sikert",
      "sikertirler",
      "sikertmek",
      "sikeyim",
      "sikicem",
      "sikiim",
      "sikik",
      "sikim",
      "sikime",
      "sikimi",
      "sikiş",
      "sikişken",
      "sikişmek",
      "sikm",
      "sikmeyi",
      "siksinler",
      "siktiğim",
      "siktimin",
      "siktin",
      "siktirgit",
      "siktir",
      "siktirgit",
      "siktirsin",
      "siqem",
      "skiym",
      "skm",
      "skrm",
      "sktim",
      "sktir",
      "sktirsin",
      "sktr",
      "sktroradan",
      "sktrsn",
      "snane",
      "sokacak",
      "sokarim",
      "sokayım",
      "sülaleni",
      "şerefsiz",
      "şerefsizler",
      "şerefsizlerin",
      "şerefsizlik",
      "tasak",
      "tassak",
      "taşak",
      "taşşak",
      "travesti",
      "yarak",
      "yark",
      "yarrağım",
      "yarrak",
      "yarramın",
      "yarrk",
      "yavşak",
      "yrak",
      "yrk",
      "ebenin",
      "ezik",
      "o.ç.",
      "orospu",
      "öküz",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "salak",
      "serefsiz",
      "sik",
      "sperm",
      "bok",
      "aq",
      "a.q.",
      "amk",
      "am",
      "amına",
      "ebenin",
      "ezik",
      "fahişe",
      "gavat",
      "gavurundölü",
      "gerizekalı",
      "göte",
      "götü",
      "götüne",
      "götünü",
      "lan",
      "mal",
      "o.ç.",
      "orospu",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "salak",
      "serefsiz",
      "sik",
      "sikkırığı",
      "sikerler",
      "sikertmek",
      "sikik",
      "sikilmiş",
      "siktir",
      "sperm",
      "taşak",
      "totoş",
      "yarak",
      "yarrak",
      "bok",
      "aq",
      "a.q.",
      "amk",
      "am",
      "ebenin",
      "fahişe",
      "gavat",
      "gerizakalı",
      "gerizekalı",
      "göt",
      "göte",
      "götü",
      "götüne",
      "götsün",
      "piçsin",
      "götsünüz",
      "piçsiniz",
      "götünüze",
      "kıçınız",
      "kıçınıza",
      "götünü",
      "hayvan",
      "ibne",
      "ipne",
      "kahpe",
      "kaltak",
      "lan",
      "mal",
      "o.c",
      "oc",
      "manyak",
      "o.ç.",
      "oç",
      "orospu",
      "öküz",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "serefsiz",
      "sik",
      "sikkırığı",
      "sikerler",
      "sikertmek",
      "sikik",
      "sikiim",
      "siktim",
      "siki",
      "sikilmiş",
      "siktir",
      "siktir",
      "sperm",
      "şerefsiz",
      "taşak",
      "totoş",
      "yarak",
      "yarrak",
      "yosma",
      "aq",
      "a.q.",
      "amk",
      "amına",
      "amınakoyim",
      "amina",
      "ammına",
      "amna",
      "sikim",
      "sikiym",
      "sikeyim",
      "siktr",
      "kodumun",
      "amık",
      "sikem",
      "sikim",
      "sikiym",
      "s.iktm",
      "s.ikerim",
      "s.ktir",
      "amg",
      "am.k",
      "a.mk",
      "amık",
      "rakı",
      "rak",
      "oruspu",
      "oc",
      "ananın",
      "ananınki",
      "bacının",
      "bacını",
      "babanın",
      "sike",
      "skim",
      "skem",
      "amcık",
      "şerefsiz",
      "piç",
      "piçinoğlu",
      "amcıkhoşafı",
      "amınasokam",
      "amkçocuğu",
      "amınferyadı",
      "amınoglu",
      "piçler",
      "sikerim",
      "sikeyim",
      "siktiğim",
      "siktiğimin",
      "amını",
      "amına",
      "amınoğlu",
      "amk",
      "ipne",
      "ibne",
      "serefsiz",
      "şerefsiz",
      "piç",
      "piçkurusu",
      "götün",
      "götoş",
      "yarrak",
      "amcik",
      "sıçarım",
      "sıçtığım",
      "aq",
      "a.q",
      "a.q.",
      "aq.",
      "a.g.",
      "ag.",
      "amınak",
      "aminak",
      "amınag",
      "aminag",
      "amınıs",
      "amınas",
      "ananı",
      "babanı",
      "anani",
      "babani",
      "bacını",
      "bacini",
      "ecdadını",
      "ecdadini",
      "sikeyim",
      "sulaleni",
      "sülaleni",
      "dallama",
      "dangalak",
      "aptal",
      "salak",
      "gerızekalı",
      "gerizekali",
      "öküz",
      "angut",
      "dalyarak",
      "sikiyim",
      "sikeyim",
      "götüne",
      "götünü",
      "siktirgit",
      "siktirgit",
      "siktirolgit",
      "siktirolgit",
      "siktir",
      "hasiktir",
      "hassiktir",
      "hassiktir",
      "dalyarak",
      "dalyarrak",
      "kancık",
      "kancik",
      "kaltak",
      "orospu",
      "oruspu",
      "fahişe",
      "fahise",
      "pezevenk",
      "pezo",
      "kocagöt",
      "ambiti",
      "götünekoyim",
      "götünekoyim",
      "amınakoyim",
      "aminakoyim",
      "amınak",
      "aminakoyayım",
      "aminakoyayim",
      "amınakoyarım",
      "aminakoyarim",
      "aminakoyarim",
      "ananısikeyim",
      "ananisikeyim",
      "ananısikeyim",
      "ananisikeyim",
      "ananisikerim",
      "ananısikerim",
      "ananisikerim",
      "ananısikerim",
      "orospucocugu",
      "oruspucocu",
      "amk",
      "amq",
      "sikik",
      "götveren",
      "götveren",
      "amınoğlu",
      "aminoglu",
      "amınoglu",
      "gavat",
      "kavat",
      "anneni",
      "annenin",
      "ananın",
      "ananin",
      "dalyarak",
      "sikik",
      "amcık",
      "siktir",
      "piç",
      "pic",
      "sie",
      "yarram",
      "göt",
      "meme",
      "dildo",
      "skcem",
      "skerm",
      "skerim",
      "skecem",
      "orrospu",
      "annesiz",
      "kahpe",
      "kappe",
      "yarak",
      "yaram",
      "dalaksız",
      "yaraksız",
      "amlı",
      "s1kerim",
      "s1kerm",
      "s1krm",
      "sikim",
      "orospuçocukları",
      "oç"
    ];
    if (küfür.some(word => newMessage.content.toLowerCase().includes(word))) {
      try {
        if (!newMessage.member.permissions.has("BAN_MEMBERS")) {
          newMessage.delete();

          return newMessage.channel
            .send(`**Hey ${newMessage.author} Dur! Bu Sunucuda Küfür Yasak!**`)
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});

///////// KÜFÜR EGEL

//////////////////REKLAM ENGEL

client.on("message", async message => {
  const lus = await db.fetch(`reklamengel_${message.guild.id}`);
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glitch.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www",
      ".gg",
      ".tk",
      ".tr.ht",
      ".ml",
      ".ga",
      ".cf",
      ".cq"
    ];
    if (
      reklamengel.some(word => message.content.toLowerCase().includes(word))
    ) {
      try {
        if (!message.member.permissions.has("BAN_MEMBERS")) {
          message.delete();

          return message.channel
            .send(`**Hey ${message.author} Dur! Bu Sunucuda Reklam Yasak!**`)
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});
client.on("messageUpdate", async (newMessage, oldMessage) => {
  const lus = await db.fetch(`reklamengel_${newMessage.guild.id}`);
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glitch.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www",
      ".gg",
      ".tk",
      ".tr.ht",
      ".ml",
      ".ga",
      ".cf",
      ".cq"
    ];
    if (
      reklamengel.some(word => newMessage.content.toLowerCase().includes(word))
    ) {
      try {
        if (!newMessage.member.permissions.has("BAN_MEMBERS")) {
          newMessage.delete();

          return newMessage.channel
            .send(`**Hey ${newMessage.author} Dur! Bu Sunucuda Reklam Yasak!**`)
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});

// SA-AS SİSTEMİ

client.on("message", async msg => {
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
  if (i == "acik") {
    if (
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "s.a" ||
      msg.content.toLowerCase() == "selamun aleyküm" ||
      msg.content.toLowerCase() == "sea" ||
      msg.content.toLowerCase() == "s.a." ||
      msg.content.toLowerCase() == "selam" ||
      msg.content.toLowerCase() == "slm"
    ) {
      try {
        return msg.reply("**Aleyküm Selam, Hoşgeldin.** ");
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "kapali") {
  }
  if (!i) return;
});

// SAYAÇ SİSTEMİ
client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (
      db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size
    ) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(
          `Başarıyla \`${db.fetch(
            `sayac_${message.guild.id}`
          )}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`
        )
        .setColor("RANDOM");
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

  member.guild.channels.cache
    .get(channel)
    .send(
      `**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(
        `sayac_${member.guild.id}`
      )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
        member.guild.memberCount}\` üye kaldı!`
    );
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

  member.guild.channels.cache
    .get(channel)
    .send(
      `**${member.user.tag}** Sunucuya Katıldı :tada:! \`${db.fetch(
        `sayac_${member.guild.id}`
      )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
        member.guild.memberCount}\` üye kaldı!`
    );
});

/// OTOROL SİSTEMİ
client.on("guildMemberAdd", async member => {
  if (db.has(`${member.guild.id}_otorol`)) {
    var rolID = db.fetch(`${member.guild.id}_otorol`);
    member.addRole(rolID);
  } else {
    return;
  }
  if (db.has(`${member.guild.id}_otokanal`)) {
    var kanal = client.channels.get(db.fetch(`${member.guild.id}_otokanal`));
    let mesaj = db.fetch(`otoRM_${member.guild.id}}`);
    let rol = await db.fetch(`${member.guild.id}_otorol`);

    const embed = new Discord.MessageEmbed();
    if (!rol) return;

    if (!mesaj) {
      client.channels.cache
        .get(kanal)
        .send(
          "👨‍🦰" +
            member.user.username +
            "`** Hoş Geldin! Otomatik Rolün Verildi Seninle Beraber** `" +
            member.guild.memberCount +
            "` **Kişiyiz!**"
        );
      return member.roles.add(rol);
    }

    if (mesaj) {
      var mesajs = mesaj
        .replace("-uye-", `${member.user}`)
        .replace("-uyetag-", `${member.user.tag}`)
        .replace("-rol-", `${member.guild.roles.cache.get(rol).name}`)
        .replace("-server-", `${member.guild.name}`)
        .replace("-uyesayisi-", `${member.guild.memberCount}`)
        .replace(
          "-botsayisi-",
          `${member.guild.members.cache.filter(m => m.user.bot).size}`
        )
        .replace("-bolge-", `${member.guild.region}`)
        .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`);
      member.roles.add(rol);
      return client.channels.cache.get(kanal).send(mesajs);
    }
  } else {
    return;
  }
});

/// OTOCEVAP SİSTEM
client.on("message", async (message, member) => {
  if (message.author.bot) return;
  let yazılar = db.fetch(`${message.guild.id}.otocevap.yazılar`);
  let cevaplar = db.fetch(`${message.guild.id}.otocevap.cevaplar`);
  var efe = "";
  let sunucuadı = message.guild.name;
  let üyesayı = message.guild.members.cache.size;
  for (
    var i = 0;
    i <
    (db.fetch(`${message.guild.id}.otocevap.yazılar`)
      ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length
      : 0);
    i++
  ) {
    if (message.content.toLowerCase() == yazılar[i].toLowerCase()) {
      efe += `${cevaplar[i]
        .replace("{sunucuadı}", `${sunucuadı}`)
        .replace("{üyesayı}", `${üyesayı}`)}`;
      message.channel.send(`${efe}`);
    }
  }
});

//KAYIT SİSTEMİ

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`kayitKanal_${member.guild.id}`);
  let mesaj = db.fetch(`kayitGM_${member.guild.id}`);
  if (!kanal) return;

  if (!mesaj) {
    client.channels.cache
      .get(kanal)
      .send(
        "**Selam!** `" +
          member.user.username +
          "`**!kayıtol yazarak kayıt olabilirsin!**"
      );
  }

  if (mesaj) {
    var mesajs = mesaj
      .replace("-uye-", `${member.user.username}`)
      .replace("-uyetag-", `${member.user.tag}`);
    return client.channels.cache.get(kanal).send(mesajs);
  }
});

/// LEVEL SYSTEM///

client.on("message", async message => {
  let prefix = ayarlar.prefix;
  var id = message.author.id;
  var gid = message.guild.id;
  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);
  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);
  if (!lvl) {
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);
    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels
          .get(kanal.id)
          .send(
            message.member.user.username +
              "** Seviye Atladı! Yeni seviyesi; `" +
              lvl +
              "` Tebrikler! :tada: **"
          );
      }
    }
    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).addRole(seviyerol);
        if (kanal) {
          client.channels
            .get(kanal.id)
            .send(
              message.member.user.username +
                "** Seviyesi **" +
                rollvl +
                "** e ulaştı ve " +
                seviyerol +
                " Rolünü kazandı! :tada: **"
            );
        }
      }
    }
  }
});

client.login(ayarlar.token);
