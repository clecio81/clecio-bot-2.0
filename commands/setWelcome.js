const { PermissionsBitField } = require('discord.js');
const admin = require('firebase-admin');

const db = admin.database();

function getChannelIdFromMention(mention) {
  if (!mention) return null;
  const match = mention.match(/^<#!?(\d+)>$/) || mention.match(/^(\d{17,20})$/);
  return match ? match[1] : null;
}

module.exports = {
  name: 'setwelcome',
  description: 'Define o canal de boas-vindas.',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply('Você precisa ser administrador para usar este comando.');
    }

    const canalID = getChannelIdFromMention(args[0]);
    if (!canalID) return message.reply('Forneça o ID ou mencione um canal válido.');

    const ref = db.ref(`canais/${message.guild.id}/welcomeChannel`);
    await ref.set(canalID);

    return message.reply(`✅ Canal de boas-vindas configurado para <#${canalID}>.`);
  }
};