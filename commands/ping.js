module.exports = {
    name: 'ping',
    desc: 'Ping the server',
    syntax: 'ping',
    execute(msg, args, client) {
        const start = Date.now();
        msg.channel.send('pong!').then(msg => {
            const end = Date.now();
            msg.edit(`pong! \`\`${end - start}ms\`\``);
        });
    }
}
