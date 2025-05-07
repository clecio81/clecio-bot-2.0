module.exports = {
  name: 'clear',
  description: '🧹 Limpa mensagens',
  async execute(message, args) {
    const amount = parseInt(args[0]);
    if (!amount || isNaN(amount)) return message.reply('🧹 Forneça um número válido de mensagens a excluir.');
    await message.channel.bulkDelete(amount, true);
    message.channel.send(`🧹 ${amount} mensagens foram deletadas!`).then(msg => setTimeout(() => msg.delete(), 3000));
  }
}