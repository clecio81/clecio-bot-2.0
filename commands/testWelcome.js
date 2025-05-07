const WELCOME = require('../events/welcome');

module.exports = {
  name: 'test-welcome',
  description: 'Testa a mensagem de boas-vindas.',
  async execute(message, args) {
    return WELCOME(message, require('firebase-admin').database());
  }
};