const Discord = require('discord.js');
const database = require('quick.db');

module.exports = async message => {
  let prefix = '!'// sizin prefixiniz ne ise onu yazın
  let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
  if(prefixler && prefixler.length >= 1) {
  prefixler.some(c => {
  if(message.content.startsWith(c)) prefix = c;
  });
  };

  if (message.content.startsWith(prefix)) {
  var command;
  var params;
  if(prefix.includes(' ')) {
  command = message.content.split(' ')[1];
  params = message.content.split(' ').slice(2);
  } else {
  command = message.content.split(' ')[0].slice(prefix.length);
  params = message.content.split(' ').slice(1);
  }
  
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
if(cmd && cmd.help.name !== 'bakım-modu') {
  const neblmölçmedimikamk = require('quick.db').fetch(client.user.id);
  if(neblmölçmedimikamk == true) {
  var DURATION = require('humanize-duration');
  const chimped =  database.fetch(client.user.id+':)');
  var TIMESTAMP = Date.now() - chimped.time;
  var RESULT = DURATION(TIMESTAMP, { language: 'tr', round: true, conjunction: ', ', serialComma: false });
  message.react(':x:');
  return message.reply(`***${client.user.username}*** şu anda bakımda.\nYaklaşık ***${RESULT} önce*** bakıma alınmış.\nBakıma Alan Yetkili: ***${chimped.author.tag}***`);
  };
  };
  
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
  }

};
