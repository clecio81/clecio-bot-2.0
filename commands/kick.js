module.exports = {
  name: 'kick',
  description: '🥾 Expulsa um usuário do servidor',
  async execute(message, args) {
    if (!message.member.permissions.has('KickMembers')) {
      return message.reply('🚫 Você não tem permissão para expulsar membros.');
    }
    const user = message.mentions.members.first();
    if (!user) return message.reply('🔍 Mencione um usuário para expulsar.');
    try {
      await user.kick();
      message.channel.send(`✅ ${user.user.tag} foi expulso com sucesso!`);
    } catch (err) {
      message.channel.send('❌ Ocorreu um erro ao tentar expulsar o usuário.');
    }
  }
};