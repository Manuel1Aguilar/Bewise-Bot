const { SlashCommandBuilder  } = require('discord.js');


new SlashCommandBuilder()
    module.exports = {
        data: new SlashCommandBuilder()
        .setName('mejorempleado')
        .setDescription('Returns al mejor empleado!'),
        async execute(interaction) {
            let msg ="";
            msg = "El mejor empleado es " + interaction.user.username;
            console.log(msg)
            await interaction.reply(msg);
        },
    };