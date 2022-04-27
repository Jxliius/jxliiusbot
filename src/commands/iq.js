const { SlashCommandBuilder, memberNicknameMention } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const random = require('random')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("iq")
    .setDescription("Berechnet deinen iq")
    .addUserOption(option => option.setName("member").setDescription("Der Member").setRequired(true)),
    async execute(interaction){
        const member = interaction.options.getMember("member")
            let iq = random.int(50, 200)
            interaction.reply({embeds: [
                new MessageEmbed()
                .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true})})
                .setTitle(`IQ von ${member.user.username}:`)
                .setDescription(`IQ = ${iq}`)
                .setColor(`#69e3e2`)
            ]})
        


           

    }
}