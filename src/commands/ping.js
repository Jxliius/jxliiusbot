const { SlashCommandBuilder } = require("@discordjs/builders")


module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
    async execute(interaction){
        //interaction.reply(`Pong 🏓`)
        interaction.reply(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
    }
}

