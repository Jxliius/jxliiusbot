const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, CommandInteractionOptionResolver, Message } = require("discord.js")
const random = require('random')

const choose = ["✂️","🗻","📃"]
module.exports = {
    data: new SlashCommandBuilder()
    .setName("stp")
    .setDescription("Spiele Schere Stein Papier!"),
    async execute(interaction){

        const embed = new MessageEmbed()
        .setTitle('Schere, Stein, Papier')
        .setColor("RANDOM")
        .setDescription('Reagiere auf die Nachricht um zu spielen')
        .addField('Spieler', interaction.user.tag)
        .setTimestamp()

        const nachricht = await(interaction.reply({embeds:[embed], fetchReply: true}))
        await(nachricht.react("✂️"))
        await(nachricht.react("🗻"))
        await(nachricht.react("📃"))
        
        const filter = (reaction, user) => {
            return ["✂️", "🗻", "📃"].includes(reaction.emoji.name) && user.id === interaction.user.id
        }
        
        const collector = nachricht.createReactionCollector({filter, time:15000, max:1})

        collector.on('end', (collected, reason) => {
            if(reason == 'time'){
                nachricht.reply('Du hast keine Zeit mehr')
            }
            else{
                const userReaction = collected.first()
                const botAuswahl = choose[Math.floor(Math.random() * choose.length)]
                const emoji = userReaction._emoji.name

                const erg = getResult(emoji, botAuswahl)

                const Finish = new MessageEmbed()
                .setTitle(erg)
                .setDescription(`${emoji} vs ${botAuswahl}`)
                .setColor("RANDOM")
                .addField('Spieler', interaction.user.tag)
                .setTimestamp()

                nachricht.reply({
                    embeds:[Finish]
                })
            }
        })


        
 
        function getResult(me, clientChosen) {
            if ((me == "🗻" && clientChosen == "✂️") ||
                (me == "📃" && clientChosen == "🗻") ||
                (me == "✂️" && clientChosen == "📃")) {
                return "Du hast Gewonnen!"
            } else if (me == clientChosen) {
                return "Untentschieden!"
            } else {
                return "Du hast verloren, versuche es erneut!"
            }
        }
        
    }

}


