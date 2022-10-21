const { SlashCommandBuilder  } = require('discord.js');
const { RAE } = require('rae-api');

new SlashCommandBuilder()
    module.exports = {
        data: new SlashCommandBuilder()
        .setName('palabra')
        .setDescription('Replies with the requested word definition!')
        .addStringOption(option =>
            option.setName('palabra')
                .setDescription('The word to look up')
                .setRequired(true)),
        async execute(interaction) {
            
		    const palabra = interaction.options.getString('palabra') ?? 'No word provided';
            let msg ="";
            const rae = new RAE();
            
            const search = await rae.searchWord(palabra);
            const wordId = search.getRes()[0].getId(); // gets palabra word id
            msg += palabra + ": ";
            const result = await rae.fetchWord(wordId);
            const definitions = result.getDefinitions();
            let isFirst = true;
            definitions.forEach( x => {
                console.log(x.getDefinition());
                if(isFirst){
                    isFirst = !isFirst;
                }else{
                    msg += " // ";
                }
                msg += x.getDefinition();
            });
            await interaction.reply(msg);
        },
    };