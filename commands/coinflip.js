module.exports = {
  name: 'coinflip',
  description: '💰 Cara ou coroa',
  execute(message) {
    const result = Math.random() < 0.5 ? '🪙 Cara' : '🪙 Coroa';
    message.reply(`💰 Resultado: ${result}`);
  }
}