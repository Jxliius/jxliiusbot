const { SlashCommandBuilder, memberNicknameMention } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const random = require('random')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Random Zahl zwischen 1 und deiner Zahl")
    .addIntegerOption(option => option.setName("zahl").setDescription("Deine Zahl").setRequired(true)),
    async execute(interaction){
        const zahl = interaction.options.getInteger("zahl")

        let randomZahl = random.int(1,zahl)
        console.log(randomZahl)

            interaction.reply({embeds: [
                new MessageEmbed()
                .setTitle(`Deine Random Zahl`)
                .setDescription(`Zahl = ${randomZahl}`)
                .setColor(`#69e3e2`)
            ]})
        


           

    }
}