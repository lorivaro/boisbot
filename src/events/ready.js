const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(client.user.tag + ' is Online!');
		client.user.setPresence({ activities: [{ name: 'the server', type: 3 }], status: 'online' });
	},
};