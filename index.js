const { Client, GatewayIntentBits, Partials, PermissionsBitField } = require('discord.js');
const admin = require('firebase-admin');
const fs = require('fs');
const jimp = require('jimp');
const os = require('os');
const WELCOME = require('./events/welcome');
const LEAVE = require('./events/leave');
require('dotenv').config();



  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
     databaseURL: process.env.FIREBASE_DB_URL,
  });



const db = admin.database();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});


const INSTANCE_ID = os.hostname(); 
const ACTIVE_REF = db.ref('instanciaAtiva');

async function isActiveInstance() {
  const snapshot = await ACTIVE_REF.once('value');
  const active = snapshot.val();
  return active === INSTANCE_ID;
}

async function setActiveInstance() {
  await ACTIVE_REF.set(INSTANCE_ID);
}

function getChannelIdFromMention(mention) {
  if (!mention) return null;
  const match = mention.match(/^<#!?(\d+)>$/) || mention.match(/^(\d{17,20})$/);
  return match ? match[1] : null;
}

client.on('ready', async () => {
  console.log(`🤖 Bot online como ${client.user.tag}`);
  
  const statuses = [
    `💻 Online no Cluster ${os.hostname()}`,
    `🎉 Cuidando dos servidores com amor! | Cluster: ${os.hostname()}`,
    `📨 Processando comandos com velocidade ⚡ | Cluster: ${os.hostname()}`,
    `🔒 Protegendo seus dados 24/7 | Cluster: ${os.hostname()}`,
    `🧠 Aprendendo novos truques... | Cluster: ${os.hostname()}`,
    `🌐 Conectado com o mundo | Cluster: ${os.hostname()}`,
    `💡 Atualizado e pronto para ajudar! | Cluster: ${os.hostname()}`,
    `📊 Monitorando atividades... | Cluster: ${os.hostname()}`,
    `🚀 Subindo para a lua! | Cluster: ${os.hostname()}`,
    `👀 Observando tudo silenciosamente... | Cluster: ${os.hostname()}`
  ];

  const types = [0, 1, 2, 3, 5]; 
  // 0 = Jogando | 1 = Transmitindo | 2 = Ouvindo | 3 = Assistindo | 5 = Competindo

  let i = 0;

  // Status inicial fixo com tipo 5 (competindo)
  client.user.setPresence({
    activities: [{
      name: statuses[i],
      type: 5
    }],
    status: 'online'
  });

  i++;

  // Alterna status e tipo a cada 30 segundos
  setInterval(() => {
    const status = statuses[i % statuses.length];
    const randomType = types[Math.floor(Math.random() * types.length)];

    client.user.setPresence({
      activities: [{
        name: status,
        type: randomType
      }],
      status: 'online'
    });

    i++;
  }, 30 * 1000);

  await setActiveInstance();
});


// Comandos
client.commands = new Map();

// Carrega os comandos da pasta ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.name && typeof command.execute === 'function') {
    client.commands.set(command.name, command);
    console.log(`✅ Comando carregado: ${command.name}`);
  } else {
    console.warn(`⚠️ Comando inválido ignorado: ${file}`);
  }
}

client.on('messageCreate', async (message) => {
  if (!await isActiveInstance()) return;
  if (message.author.bot || !message.guild) return;

  const guildId = message.guild.id;
  const prefixRef = db.ref(`prefixos/${guildId}`);
  const snapshot = await prefixRef.once('value');
  const prefix = snapshot.val() || '!';

/// MENÇÃO AO BOT

if (message.mentions.has(client.user)) {
  const guildId = message.guild.id;
  const prefixRef = db.ref(`prefixos/${guildId}`);

  prefixRef.once('value', (snapshot) => {
    const prefix = snapshot.exists() ? snapshot.val() : '!';
    message.reply({
      content: `<a:8368_Flying_Hearts_Pink:1367772844490096642> Olá! Meu prefixo aqui é \`${prefix}\`.\nUse \`${prefix}ajuda\` para ver os comandos!`,
      allowedMentions: { repliedUser: false }
    });
  });
}

// TERMINO

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (command) {
    try {
      await command.execute(message, args, db); // Passe o db para comandos que precisam
    } catch (err) {
      console.error(`Erro ao executar o comando "${commandName}":`, err);
      message.reply('❌ Ocorreu um erro ao executar este comando.');
    }
  }
});

// Eventos
client.on('guildMemberAdd', async (member) => {
  if (!await isActiveInstance()) return;
  return WELCOME(member, db);
});

client.on('guildMemberRemove', async (member) => {
  if (!await isActiveInstance()) return;
  return LEAVE(member, db);
});

client.on('guildDelete', async (guild) => {
  if (!await isActiveInstance()) return;

  const guildID = guild.id;
  const ref = db.ref(`canais/${guildID}`);

  try {
    await ref.remove();
    console.log(`🗑️ Dados do servidor ${guild.name} (${guildID}) foram removidos do Firebase.`);
  } catch (error) {
    console.error(`❌ Erro ao remover dados do servidor ${guild.name}:`, error);
  }
});

client.login(process.env.TOKEN);
