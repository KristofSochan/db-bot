import debugModule from 'debug';
const debug = debugModule('bot');
const error = debugModule('error');

import DiscordJS, {Client, Intents} from 'discord.js';

debug('connecting to discord bot');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	debug('connected to discord bot');

    // set a guildId for testing (global commands take up to an hour to register)
    const guildId = '986456603840626808';
    const guild = client.guilds.cache.get(guildId);
    let commands

    if (guild) {
        commands = guild.commands;
    }
    else { // fetch global commands
        commands = client.application.commands;
    }

    commands.create({
        name: 'find',
        description: 'finds all entries that contain the entered text',
        options: [
            {
                name: 'query',
                description: 'enter the text you wish to find in the DB',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            },

            {
                name: 'query2',
                description: 'enter the text you wish to find in the DB',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    });
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;

    if (commandName === 'find') {
        interaction.reply({
            content: 'Fetched your DB data', // To do: connect to DB (find all rows with matching text)
            ephermeral: true
        });
    }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);