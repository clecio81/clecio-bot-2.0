const { AttachmentBuilder } = require('discord.js');
const Jimp = require('jimp');

module.exports = {
  name: 'userinfo',
  description: '👤 Mostra informações do usuário',
  async execute(message) {
    const user = message.mentions.users.first() || message.author;
    const avatar = await Jimp.read(user.displayAvatarURL({ extension: 'png', size: 512 }));
    avatar.resize(64, 64);
    const image = new Jimp(400, 150, '#2f3136');
    image.composite(avatar, 10, 10);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    image.print(font, 90, 10, `Usuário: ${user.username}`);
    image.print(font, 90, 30, `ID: ${user.id}`);
    image.print(font, 90, 50, `Tag: ${user.tag}`);
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    const attachment = new AttachmentBuilder(buffer, { name: 'userinfo.png' });
    message.reply({ files: [attachment] });
  }
};