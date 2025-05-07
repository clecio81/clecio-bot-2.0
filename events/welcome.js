
const fs = require('fs');
const jimp = require('jimp');
module.exports = async (message, db) => {
  try {
    const member = message.member || await message.guild.members.fetch(message.author.id);
    const guildID = message.guild.id;
    const ref = db.ref(`canais/${guildID}/welcomeChannel`);

    ref.once('value', async (snapshot) => {
      if (!snapshot.exists()) return message.reply('❌ Canal de boas-vindas não configurado.');

      const channelId = snapshot.val();
      const channel = message.guild.channels.cache.get(channelId);
      if (!channel) return message.reply('❌ Canal de boas-vindas não encontrado.');

      const avatarURL = member.user.displayAvatarURL({ extension: 'png', size: 512 });

      const fundo = await jimp.read('./assets/welcome-leave.png');
      const avatar = await jimp.read(avatarURL);
      const mask = await jimp.read('./assets/mask.png');
      const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);

      avatar.resize(190, 170);
      mask.resize(200, 198);
      avatar.mask(mask);

      fundo.print(font, 250, 100, member.user.username);
      fundo.print(font, 250, 140, "Bem-Vindo(a)!");
      fundo.composite(avatar, 40, 40);

      const imagePath = './welcome_image.png';
      await fundo.writeAsync(imagePath);

      await channel.send(`👋 <@${member.user.id}>, seja muito bem-vindo(a) ao servidor! <a:wel1:794831009296023592> <a:come2:794830877350952960>`);
      await channel.send({ files: [imagePath] });

      // Opcional: deletar a imagem após envio
      fs.unlinkSync(imagePath);
    });

  } catch (err) {
    console.error('Erro ao enviar mensagem de boas-vindas:', err);
    message.reply('❌ Ocorreu um erro ao gerar a imagem de boas-vindas.');
  }
};
