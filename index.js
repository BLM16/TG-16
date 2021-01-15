const { Client, Collection } = require("discord.js");
const { readFile, readdirSync } = require("fs");

const { prefix, presence } = require("./_core/config.json");

const client = new Client();
client.commands = new Collection();

// Get all the commands and bind them to the bot
const cmdFiles = readdirSync('./commands/').filter(f => f.endsWith('.js'));
cmdFiles.forEach(file => {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
    if(cmd.aliases != null) cmd.aliases.forEach(alias => {
        client.commands.set(alias, cmd);
    });
});

// Runs when the bot is ready
client.once('ready', () => {
    // Set the bot's status
    client.user.setStatus(presence.status);
    client.user.setActivity(presence.activity, { type: presence.activityType });

    console.log(`Loaded ${client.commands.map(c => c).length} commands and aliases.`) 
    console.log('TG-16 is online.')
});

// Runs every time a message is sent
client.on('message', msg => {
    // Don't allow commands to be run in dms
    if(msg.channel.type == 'dm') return;

    // Check if the message starts with the bot's prefix and treat it as a command
    if(msg.content.startsWith(prefix) && !msg.author.bot) {
        const args = msg.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();

        try { client.commands.get(cmd).execute(msg, args, client); }
        catch(e) { return; }
    }

    // Check if the message starts by pinging the bot and treat it as a command
    if(msg.content.startsWith(`<@!${client.user.id}>`) && !msg.author.bot) {
        const args = msg.content.split(/ +/).slice(1);
        const cmd = args.shift().toLowerCase();

        try { client.commands.get(cmd).execute(msg, args, client) }
        catch(e) { return; }
    }
});

// Read the token and log the bot in
readFile('./_core/TOKEN', 'utf8', (err, token) => {
    if(err) console.log(err);
    client.login(token);
});
