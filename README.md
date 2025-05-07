# 🤖 Clécio Bot — Discord

<p align="center">
  <img src="./assets/gif/clecio-icon-gif.gif" alt="Clécio Bot" width="240"/>
</p>

Bot profissional e multilíngue para Discord com sistema de perfis, moedas, níveis e integração completa com Firebase.

---

## 📌 Índice

- [🔍 Sobre](#-sobre)
- [📋 Funcionalidades](#-funcionalidades)
- [🚀 Tecnologias](#-tecnologias)
- [⚙️ Pré-requisitos](#️-pré-requisitos)
- [📦 Instalação](#-instalação)
- [🔧 Configuração](#-configuração)
- [💡 Comandos](#-comandos)
- [📐 Arquitetura](#-arquitetura)
- [🌍 Internacionalização](#-internacionalização)
- [🤝 Contribuindo](#-contribuindo)
- [📄 Licença](#-licença)

---

## 🔍 Sobre

O **Clécio Bot** é um bot Discord altamente customizável, com foco em:
- Interatividade
- Estética visual moderna (Jimp e avatar estilizado)
- Gerenciamento de usuários
- Gamificação (XP, nível e moedas)
- Sistema multilíngue global
- Persistência de dados em tempo real com Firebase

Ideal para comunidades, servidores de jogos, projetos educacionais e sistemas gamificados de engajamento.

---

## 📋 Funcionalidades

| Recurso                | Descrição                                                                 |
|------------------------|---------------------------------------------------------------------------|
| 🎮 Sistema de XP        | Ganha XP por mensagens e atinge novos níveis                             |
| 💰 Moedas virtuais      | Economia interna com `daily`, `pay`, `store`, etc.                       |
| 🧍 Perfil de usuário    | Avatar com máscara hexagonal, fundo customizável, VIP/Staff e stats      |
| 🌐 Suporte multilíngue | Detecta o idioma do usuário automaticamente                              |
| 💾 Firebase            | Armazena XP, moedas, fundo do perfil e outros dados                      |
| 🎨 Customização         | Fundos personalizados e ícones por função                                |
| 📊 Analytics internos   | Sistema de logs para comandos e eventos                                 |

---

## 🚀 Tecnologias

- Node.js
- Discord.js
- Firebase Admin SDK
- Jimp
- i18next

---

## ⚙️ Pré-requisitos

- Node.js v18+ e npm
- Conta e projeto no Firebase
- Token de bot no Discord Developer Portal

---

## 📦 Instalação

```bash
git clone https://github.com/clecio81/clecio-bot-2.0.git
cd clecio-bot
npm install
```

---

## 🔧 Configuração
# Token do Bot Discord (substitua pelo seu real)
TOKEN=seu_token_aqui

# Configurações do Firebase
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=clecio-bot
FIREBASE_PRIVATE_KEY_ID=***************
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n***************\\n-----END PRIVATE KEY-----\\n"
FIREBASE_CLIENT_EMAIL=********@clecio-bot.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=***************
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/********%40clecio-bot.iam.gserviceaccount.com
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
FIREBASE_DB_URL=https://clecio-bot.firebaseio.com

---

## 💡 Comandos

| Comando               | Descrição                                 |
| --------------------- | ----------------------------------------- |
| `/ajuda`              | Lista todos os comandos disponíveis       |
| `/perfil`             | Mostra o perfil visual com estatísticas   |
| `/setBackground`      | Define o plano de fundo do seu perfil     |
| `/daily`              | Receba moedas diariamente                 |
| `/userinfo`           | Veja informações detalhadas de um usuário |
| `/language [idioma]`  | Altere o idioma do seu perfil             |
| `/avatar`             | Veja o avatar de um usuário               |
| `/ping`               | Mostra a latência do bot                  |
| `/botinfo`            | Informações sobre o bot                   |
| `/say [mensagem]`     | Faça o bot repetir uma mensagem           |
| `/coinflip`           | Cara ou coroa                             |
| `/8ball [pergunta]`   | Faça uma pergunta para a bola mágica      |
| `/clear [quantidade]` | Apaga mensagens do chat                   |
| `/serverinfo`         | Informações sobre o servidor              |
| `/setWelcome`         | Define o canal de Boas-Vindas             |
| `/setLeave`           | Define o canal de saída                   |
| `/testWelcome`        | Testa a mensagem de Boas-Vindas           |
| `/testLeave`          | Testa a mensagem de saída                 |
| `/setPrefix`          | Altere o prefixo do bot no servidor       |
| `/mute [usuário]`     | Silencia um usuário                       |
| `/unmute [usuário]`   | Remove o silêncio de um usuário           |
| `/kick [usuário]`     | Expulsa um usuário do servidor            |
| `/ban [usuário]`      | Bane um usuário do servidor               |
| `/invite`             | Link para adicionar o bot ao seu servidor |

---

## 📐 Arquitetura

```
clecio-bot/
├── commands/
├── events/
├── assets/
├── assets/fundos
├── assets/gif
├── firebase/
├── .env
├── index.js
└── README.md
```

---

## 🌍 Internacionalização

Utiliza i18next e arquivos de tradução JSON em `locale/`.

---

## 🤝 Contribuindo

1. Faça um fork
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: nova feature'`)
4. Push para sua branch (`git push origin feature/minha-feature`)
5. Crie um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

<p align="center">
  Feito com 💙 por <strong>Clécio</strong>
</p>