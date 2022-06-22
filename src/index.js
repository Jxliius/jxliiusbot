require("dotenv").config()
const fs = require("fs")
const { Client, Collection, Intents, MessageEmbed} = require("discord.js")
const { type } = require("os")
const config = require("./Data/config.json")
const { channel } = require("diagnostics_channel")

const client = new Client({
    intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})
client.commands = new Collection()

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))


commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})

client.on("ready", async() => {
    console.log(`Ready! Logged in as ${client.user.tag}! Im on ${client.guilds.cache.size} guild(s)!`);

        client.user.setPresence({
            activities:[
                {
                    name: 'Visual Studio Code',
                    type: 'PLAYING'
                }
            ],
            status: 'dnd'
        })        
    })
client.on("messageCreate", message => {
        //console.log(message.content);
        const channelwl = message.guild.channels.cache.get('957291147343040552')
        const channelv = message.guild.channels.cache.get('813166808391483412')
        const channellf = message.guild.channels.cache.get('813322261795962940')
        const channelart = message.guild.channels.cache.get('986725464808755330')
        const channelwlms2 = message.guild.channels.cache.get('988931917653086258')
        if(!(message.channel == channelwl)|| (message.channel == channelv)||(message.channel == channellf)){
            if(message.content == "<@964529781557329960>"){
                const embed = new MessageEmbed()
    
                embed
                .setColor("GREEN")
                .setTitle("Ich wurde gerufen")
                .setThumbnail(client.user.avatarURL({dynamic: true}))
                .setDescription("Ich bin hier um dir zu helfen")
                .addField("Du brauchst Info", "Dann benutze doch /info")
                .addField("Du willst Schere, Stein, Papier spielen?", "Benutze /stp")
                
                
                message.reply({
                    embeds: [embed]
                })
            }
        }
            if(message.channel == channelwl){
                if(message.content.startsWith('W/L') || message.content.startsWith('w/l')){
                    message.react('👍')
                    .then(() => message.react('🤷‍♀️'))
                    .then(() => message.react('👎'))
                }
                else{
                    message.delete()
                }
            }
            if(message.channel == channelv){
                message.react('👍')
                .then(() => message.react('🤷‍♀️'))
                .then(() => message.react('👎'))
            }
            if(message.channel == channellf){
                if(message.content.toLowerCase().startsWith('looking for') || message.content.toLowerCase().startsWith('lf')){

                }
                else{
                    message.delete('👍')
                }
            }
            if(message.channel == channelart){
                message.react('👍')
            }
            if(message.channel == channelwlms2){
                if(message.content.startsWith('W/L') || message.content.startsWith('w/l')){
                    message.react('👍')
                    .then(() => message.react('🤷‍♀️'))
                    .then(() => message.react('👎'))
                }
})
   



client.on("interactionCreate", async (interaction) => {

    if(!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if(command){
        try{
           await command.execute(interaction) 
        }catch(error){
            console.error(error)

            if(interaction.deferred || interaction.replied){
                interaction.editReply("Es ist ein Fehler beim Ausführen aufgetreten!")
            }
            else{
                interaction.reply("Es ist ein Fehler beim Ausführen aufgetreten!")
            }
        }
    }
})






client.login(config.token)