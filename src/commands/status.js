const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { guild } = require("../../config.json");
const util = require('minecraft-server-util');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Retrieve Minecraft server status'),
	async execute(interaction) {
		const statusEmbed = new EmbedBuilder()
			.setDescription('Retrieving server status...')
			.setColor("LightGrey");
		const reply = await interaction.reply({ embeds: [statusEmbed], fetchReply: true });

		const serverIp = guild.mcServerIp;
		const serverPort = 25565;
		let status;
		try {
			status = await util.status(serverIp, serverPort, { timeout: 1000 * 5 });
		} catch (error) {
			const statusEmbed = new EmbedBuilder()
				.setDescription('The server seems to be offline.')
				.setColor('Red')
				.setTimestamp();
			return reply.edit({ embeds: [statusEmbed] });
		}

		const playerList = status.players.online <= 0 ? 'No players online.' : status.players.sample
			.map(player => player.name)
			.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}))
			.join('\n');
		const faviconPNG = status.favicon ? Buffer.from(status.favicon.split(',')[1], 'base64') : interaction.user.avatarURL();

		statusEmbed
			.setTitle('Minecraft Server Status')
			.setDescription("```" + status.motd.clean + "```")
			.setThumbnail('attachment://favicon.png')
			.setFields([
				{
					"name": "Host",
					"value": `\`${serverIp}\``,
					"inline": true
				},
				{
					"name": "Version",
					"value": status.version.name || "Unknown version",
					"inline": true
				},
				{
					"name": "Ping",
					"value": status.roundTripLatency + " ms",
					"inline": true
				},
				{
					"name": `Players: ${status.players.online} / ${status.players.max}`,
					"value": "```" + playerList + "```"
				}
			])
			.setColor('Green')
			.setTimestamp();

		return reply.edit({ 
			embeds: [statusEmbed],
			files: [{
				attachment: faviconPNG,
				name: 'favicon.png'
			}]
		});
	},
};