const { SlashCommandBuilder  } = require('discord.js');
const getTime = require('../utils/timeAPI');

const urlAr = "http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires";
const urlEs = "http://worldtimeapi.org/api/timezone/Europe/Madrid";

new SlashCommandBuilder()
    module.exports = {
        data: new SlashCommandBuilder()
        .setName('hora')
        .setDescription('Gives argentina and spain time!'),
        async execute(interaction) {
            let msg ="";
            let arTime = await getTime(urlAr);
            let esTime = await getTime(urlEs);
            console.log(arTime);
            
            msg = "La hora en Argentina es " + arTime.split("T")[1].split(".")[0] + "\nLa hora en España es " + esTime.split("T")[1].split(".")[0];
            console.log(msg)
            await interaction.reply(msg);
        },
    };