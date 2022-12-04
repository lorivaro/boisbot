const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { guild } = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const pingEmbed = new EmbedBuilder()
			.setTitle('🏓 Pong!')
			.setDescription(`**Bot:** \`Pinging...\`\n**API:** \`${interaction.client.ws.ping} ms\``)
			.setColor(guild.color);

		interaction.reply({ embeds: [pingEmbed], fetchReply: true }).then((message) => {
			pingEmbed.setDescription(`**Bot:** \`${ message.createdTimestamp - interaction.createdTimestamp} ms\`\n**API:** \`${interaction.client.ws.ping} ms\``);
			message.edit({ embeds: [pingEmbed] });
		});
	},
};