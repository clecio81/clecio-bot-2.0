const LEAVE = require('../events/leave');

module.exports = {
  name: 'test-leave',
  description: 'Testa a mensagem de saída.',
  async execute(message, args) {
    return LEAVE(message, require('firebase-admin').database());
  }
};