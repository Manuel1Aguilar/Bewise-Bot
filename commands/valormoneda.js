const { SlashCommandBuilder  } = require('discord.js');
const getValue = require('../utils/currencyAPI');


new SlashCommandBuilder()
    module.exports = {
        data: new SlashCommandBuilder()
        .setName('valor')
        .setDescription('Returns currency value!')
        .addStringOption(option =>
            option.setName('de')
                .setDescription('Cuanto vale un')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('a')
                .setDescription('en')
                .setRequired(true)),
        async execute(interaction) {
            
		    const from = interaction.options.getString('de') ?? 'No de provided';

		    const to = interaction.options.getString('a') ?? 'No a provided';

          
            let value = await getValue(from, to);
            console.log(value);
            console.log(`${from}\\${to}: ${value}`)
            await interaction.reply(`${from}\\${to}: ${value}`);
        },
    };
