const { AttachmentBuilder } = require('discord.js');
const jimp = require('jimp');

module.exports = {
  name: 'avatar',
  description: '🖼️ Veja o avatar de um usuário!',
  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    const avatarURL = user.displayAvatarURL({ extension: 'png', size: 512 });
    const bg = await jimp.read('./assets/mask.png');
    const avatar = await jimp.read(avatarURL);

    avatar.resize(250, 249).circle();
    bg.resize(300, 350).composite(avatar, 25, 60);

    const font = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
    bg.print(font, 59, 20, `Avatar de ${user.username}`);
    const buffer = await bg.getBufferAsync(jimp.MIME_PNG);
    const attachment = new AttachmentBuilder(buffer, { name: 'avatar.png' });
    return message.reply({ files: [attachment] });
  }
};
