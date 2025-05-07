module.exports = {
  name: 'ban',
  description: '🚫 Bane um usuário do servidor',
  async execute(message, args) {
    if (!message.member.permissions.has('BanMembers')) {
      return message.reply('🚫 Você não tem permissão para banir membros.');
    }
    const user = message.mentions.members.first();
    if (!user) return message.reply('🔍 Mencione um usuário para banir.');
    try {
      await user.ban();
      message.channel.send(`✅ ${user.user.tag} foi banido com sucesso!`);
    } catch (err) {
      message.channel.send('❌ Ocorreu um erro ao tentar banir o usuário.');
    }
  }
};