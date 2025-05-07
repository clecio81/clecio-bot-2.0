module.exports = {
  name: 'mute',
  description: '🔇 Silencia um membro (requer cargo Mutado)',
  async execute(message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.reply('🔍 Mencione um usuário para silenciar.');
    const role = message.guild.roles.cache.find(r => r.name === "Mutado");
    if (!role) return message.reply('❌ Cargo "Mutado" não encontrado.');
    await member.roles.add(role);
    message.channel.send(`🔇 ${member.user.tag} foi silenciado.`);
  }
};