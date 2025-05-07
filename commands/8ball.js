const respostas = ['Sim', 'Não', 'Talvez', 'Com certeza', 'Nunca', 'Acho que sim', 'Não posso dizer agora'];
module.exports = {
  name: '8ball',
  description: '🎱 Responde sua pergunta',
  execute(message, args) {
    if (!args.length) return message.reply('🎱 Faça uma pergunta.');
    const resposta = respostas[Math.floor(Math.random() * respostas.length)];
    message.reply(`🎱 ${resposta}`);
  }
}