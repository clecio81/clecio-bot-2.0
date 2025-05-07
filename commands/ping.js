module.exports = {
  name: 'ping',
  description: '🏓 Mostra a latência do bot',
  async execute(message) {
    const msg = await message.channel.send('🏓 Pingando...');
    const latency = msg.createdTimestamp - message.createdTimestamp;
    msg.edit(`🏓 Pong! Latência: ${latency}ms`);
  }
}