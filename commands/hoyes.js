const { SlashCommandBuilder  } = require('discord.js');


new SlashCommandBuilder()
    module.exports = {
        data: new SlashCommandBuilder()
        .setName('hoyes')
        .setDescription('Returns current day!'),
        async execute(interaction) {
            let msg ="";
            msg = "Hoy es viernes!";
            console.log(msg)
            await interaction.reply(msg);
        },
    };