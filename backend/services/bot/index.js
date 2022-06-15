import debugModule from 'debug';
const debug = debugModule('bot');
const error = debugModule('error');

import DiscordJS, { Client, Intents } from 'discord.js';

debug('connecting to discord bot');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = ';';

// When the client is ready, run this code (only once)
client.once('ready', () => {
	debug('connected to discord bot');

  // Code to set up / commands if needed
  /*const guildId = '986456603840626808';
  const guild = client.guilds.cache.get(guildId);
  let commands;

  if (guild) {
    commands = guild.commands;
  }
  else { // fetch global commands
    commands = client.application.commands;
  }*/

});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'find') {
    message.channel.send('Fetching DB data');
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
