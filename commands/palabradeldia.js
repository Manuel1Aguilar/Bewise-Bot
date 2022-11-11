const { SlashCommandBuilder  } = require('discord.js');
const { RAE } = require('rae-api');
const getWOTDMsg = require('../utils/raeAPI');

new SlashCommandBuilder()
    module.exports = {
        data: new SlashCommandBuilder()
        .setName('palabradeldia')
        .setDescription('Replies with Word of the day!'),
        async execute(interaction) {
            let msg = await getWOTDMsg();

            await interaction.reply(msg.substring(0, 2000));
        },
    };