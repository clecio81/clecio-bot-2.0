module.exports = {
  name: 'serverinfo',
  description: '🌐 Mostra informações do servidor',
  execute(message) {
    const { guild } = message;
    const embed = {
      color: 0x0099ff,
      title: `🌐 Informações do Servidor`,
      fields: [
        { name: 'Nome', value: guild.name, inline: true },
        { name: 'ID', value: guild.id, inline: true },
        { name: 'Membros', value: guild.memberCount.toString(), inline: true },
      ],
      timestamp: new Date(),
    };
    message.channel.send({ embeds: [embed] });
  }
}