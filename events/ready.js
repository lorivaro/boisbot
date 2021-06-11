const { bot } = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`${client.user.tag} is Online!`);
		client.user.setPresence({ activity: { name: `the server | ${bot.prefix}help`, type:'WATCHING' }, status:'online' });
	},
};