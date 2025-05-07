module.exports = {
  name: 'say',
  description: '📝 Repete a mensagem informada',
  execute(message, args) {
    const text = args.join(' ');
    if (!text) return message.reply('📝 Forneça algo para eu dizer.');
    message.channel.send(text);
  }
}