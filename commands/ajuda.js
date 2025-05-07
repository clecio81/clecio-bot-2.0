const { AttachmentBuilder } = require('discord.js');
const Jimp = require('jimp');

module.exports = {
  name: 'ajuda',
  description: 'Mostra todos os comandos disponíveis',
  async execute(message, args) {
    // Carrega a imagem de fundo e fontes
    const background = await Jimp.read('./assets/fundos/ajuda_bg.png');
    const fontTitle = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    const fontD = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

    // Lista de comandos
    const comandos = [
      { nome: 'avatar', desc: 'Veja o avatar de um usuário' },
      { nome: 'userinfo', desc: 'Veja suas informações ou de outro usuário' },
      { nome: 'ping', desc: 'Mostra a latência do bot' },
      { nome: 'botinfo', desc: 'Informações sobre o bot' },
      { nome: 'say', desc: 'Faça o bot repetir algo' },
      { nome: 'coinflip', desc: 'Cara ou coroa' },
      { nome: '8ball', desc: 'Faça uma pergunta para a bola mágica' },
      { nome: 'clear', desc: 'Apaga mensagens do chat' },
      { nome: 'serverinfo', desc: 'Informações sobre o servidor' },
      { nome: 'ajuda', desc: 'Exibe esta mensagem de ajuda' },
      { nome: 'SetWelcome', desc: '   Canal de Boas-Vindas' },
      { nome: 'setLeave', desc: '  Canal de saida' },
      { nome: 'testWelcome', desc: 'Teste a mensagem de Boas-Vindas' },
      { nome: 'testeLeave', desc: 'Teste a mensagem de Saida' },
      { nome: 'setPrefix', desc: 'Mude meu prefixo neste servidor' },
      { nome: 'mute', desc: 'Silencie um usuário' },
      { nome: 'unmute', desc: 'Tire o silencio de um usuáruio' },
      { nome: 'kick', desc: 'Expulse um usuário' },
      { nome: 'ban', desc: 'Banir um usuário' },
      { nome: 'invite', desc: 'Me adicione no seu servidor' },
    ];

    // Escreve o título no topo da imagem
    background.print(fontTitle, 280, 80,'Comandos disponíveis');

    // Lista os comandos
    let y = 290;
    for (const cmd of comandos) {
      // Nome do comando
      background.print(font, 25, y, `${cmd.nome}`);
      background.print(font, 26, y, `${cmd.nome}`); // sombra leve

      // Descrição do comando
      background.print(fontD, 320, y+25, `- ${cmd.desc}`);

      // Linha separadora
      background.scan(20, y + 65, background.bitmap.width - 60, 2, function (x, yLine, idx) {
        this.bitmap.data[idx + 0] = 255; // R
        this.bitmap.data[idx + 1] = 255; // G
        this.bitmap.data[idx + 2] = 255; // B
        this.bitmap.data[idx + 3] = 150; // Transparência
      });

      y += 60;
    }

    // Avatar do autor
    const avatarURL = message.author.displayAvatarURL({ extension: 'png', size: 512 });
    const avatar = await Jimp.read(avatarURL);
    avatar.resize(250, 250).circle(); 
    background.composite(avatar, 20, 30); 

    // Gera a imagem final
    const buffer = await background.getBufferAsync(Jimp.MIME_PNG);
    const attachment = new AttachmentBuilder(buffer, { name: 'ajuda.png' });

    // Envia a imagem no chat
    message.reply({
      content: ':blue_book: Aqui estão os comandos disponíveis:',
      files: [attachment]
    });
  }
};
