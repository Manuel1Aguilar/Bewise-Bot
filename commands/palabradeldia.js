const { SlashCommandBuilder  } = require('discord.js');
const { RAE } = require('rae-api');

new SlashCommandBuilder()
    module.exports = {
        data: new SlashCommandBuilder()
        .setName('palabradeldia')
        .setDescription('Replies with Word of the day!'),
        async execute(interaction) {
            let msg ="";
            const rae = new RAE();
            const wotd = await rae.getWordOfTheDay();
            console.log(wotd.getHeader());
            msg += "La palabra del día es " + wotd.getHeader() + ": ";
            const result = await rae.fetchWord(wotd.getId());
            const definitions = result.getDefinitions();
            let isFirst = true;
            definitions.forEach( x => {
                console.log(x.getDefinition());
                if(isFirst){
                    isFirst = !isFirst;
                }else{
                    msg += "  // ";
                }
                msg += x.getDefinition();
            });
            await interaction.reply(msg);
        },
    };