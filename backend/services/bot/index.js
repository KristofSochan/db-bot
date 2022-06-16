import debugModule from 'debug';
const debug = debugModule('bot');
const error = debugModule('error');

/*import DiscordJS, { Client, Intents } from 'discord.js';
import sql from '../db/index.js';

debug('connecting to discord bot');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = ';';

client.once('ready', () => {
	debug('connected to discord bot');
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // Add coordinates
  if (/^\d/.test(command)) { // if command starts with a digit
    debug('Adding coord');
    
    const description = args.join(' ');

    let date_entered = new Date();
    date_entered = date_entered.toISOString().substring(0,10); // yyyy-mm-dd format

    const stmt = 'INSERT INTO mc_1.world_1(date_entered, dimension, coordinates, description) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [date_entered, 'overworld', command, description]
    // to-do: add option for other dimensions via -nether, -end after description

    sql
      .query(stmt, values)
      .then(res => {
        console.log(res.rows[0]);
        message.channel.send(`Saved: ${res}`);
      })
      .catch(e => {
        console.error(e.stack)
        message.channel.send(`Error: ${e.stack}`);
      })

    debug('Added coord to DB');
  }

  // Find coordinates
  if (command === 'find') {
    message.channel.send('Fetching DB data');
    message.channel.send(command);
    message.channel.send('args: ' + args);
  }

});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);*/
