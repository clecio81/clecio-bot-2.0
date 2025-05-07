const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'setprefix',
  description: 'Altere o prefixo de comandos do bot para este servidor.',
  async execute(message, args, db) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply('Você precisa ser administrador para mudar o prefixo.');
    }

    const novoPrefixo = args[0];
    if (!novoPrefixo) {
      return message.reply('Informe o novo prefixo. Ex: `!setPrefix !`');
    }

    const prefixRef = db.ref(`prefixos/${message.guild.id}`);
    await prefixRef.set(novoPrefixo);

    message.reply(`✅ Prefixo alterado para: \`${novoPrefixo}\``);
  }
};
