const fs = require('fs');
const jimp = require('jimp');
module.exports = async (message, db) => {
const member = message.member;
const guildID = message.guild.id;
const ref = db.ref(`canais/${guildID}/leaveChannel`);

ref.once('value', async (snapshot) => {
  if (!snapshot.exists()) return message.reply('Canal de boas-vindas não configurado.');

  const channelId = snapshot.val();
  const channel = message.guild.channels.cache.get(channelId);
  if (!channel) return message.reply('Canal não encontrado.');

  const avatarURL = member.user.displayAvatarURL({ extension: 'png', size: 512 });

  const fundo = await jimp.read('./assets/welcome-leave.png');
  const avatar = await jimp.read(avatarURL);
  const mask = await jimp.read('./assets/mask.png');
  const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);

  avatar.resize(190, 170);
  mask.resize(200, 198);
  avatar.mask(mask);

  fundo.print(font, 250, 100, member.user.username);
  fundo.print(font, 250, 140, "Saiu do servidor...");
  fundo.composite(avatar, 40, 40);
  await fundo.writeAsync('leave_image.png');
  channel.send(`<@${member.user.id}>, Saiu do servidor! <a:saiu:794831286039871519>`);
  channel.send({ files: ['leave_image.png'] });
})
};