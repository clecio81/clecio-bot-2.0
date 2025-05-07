module.exports = {
  name: 'invite',
  description: 'Gera link de convite do bot.',
  async execute(message, args, client) {
    const clientId = "695760577485733910"
    const inviteURL = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`;

    await message.reply({
      content: `<a:HeartsPink:1367040469187432518> Me adicione no seu servidor com esse link fofo: [Clique aqui para me adicionar!](${inviteURL})`,
      ephemeral: true
    });
  }
};