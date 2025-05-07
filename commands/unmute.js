module.exports = {
  name: 'unmute',
  description: '🔊 Remove o silêncio de um membro',
  async execute(message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.reply('🔍 Mencione um usuário para desmutar.');
    const role = message.guild.roles.cache.find(r => r.name === "Mutado");
    if (!role) return message.reply('❌ Cargo "Mutado" não encontrado.');
    await member.roles.remove(role);
    message.channel.send(`🔊 ${member.user.tag} não está mais silenciado.`);
  }
};