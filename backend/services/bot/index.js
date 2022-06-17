import debugModule from 'debug';
const debug = debugModule('bot');
const error = debugModule('error');

import { Client, Intents } from 'discord.js';
import pool from '../db/index.js';

debug('connecting to discord bot');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = ';';

client.once('ready', () => {
	debug('connected to discord bot');
});

client.on('messageCreate', message => {
  debug('message sent')
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // Add coordinates
  if (/^\d/.test(command) || /^-/.test(command)) { // if command starts with a digit or negative digit
    debug('Adding coord');
    
    const description = args.join(' ');

    let date_entered = new Date();
    date_entered = date_entered.toISOString().substring(0,10); // yyyy-mm-dd format

    const stmt = `
      INSERT INTO mc_1.world_1(date_entered, dimension, coordinates, description)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [date_entered, 'Overworld', command, description];
    // to-do: add option for other dimensions via -nether, -end after description

    pool
      .query(stmt, values)
      .then(res => {
        
        let details = res.rows[0]; // sql json object
        let msg = '\```json\n{'
        for (const key in details) {
            if (details.hasOwnProperty(key)) {
                msg = msg + "\n \"" + key + "\": \"" + details[key] + "\",";
            }                        
        }
        msg = msg.substring(0, msg.length - 1)
        msg = msg + "\n}\`\`\`"
        message.channel.send('Successfully added to the DB:')
        message.channel.send(msg);
        debug('Added coord to DB:');
        debug(details);
      })
      .catch(e => {
        error(e.stack)
      })
  }

  // Find coordinates
  if (command === 'find') {
    message.channel.send('Fetching DB data');
    message.channel.send(command);
    message.channel.send('args: ' + args);
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
