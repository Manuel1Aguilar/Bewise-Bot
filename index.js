
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events, Message } = require('discord.js');
const { token, birthdayChannelID, guildId } = require('./config.json');
const { RAE } = require('rae-api');
const checkBirthdays = require('./utils/checkBirthdays.js');
const cron = require('cron');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();
const rae = new RAE();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async  interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
client.once("ready", () => {
    console.log(`Online as ${client.user.tag}`);
      
    let scheduledMessage = new cron.CronJob('0 05 09 * * *', async () => {
        
        const bdays =await checkBirthdays();
        if(bdays){
            const guild = client.guilds.cache.get(guildId);
            const channel = guild.channels.cache.get(birthdayChannelID);
            let connector = "le";
            const addMiddle = bdays.length > 1;
            let bdaysString = bdays.shift();
            let lastBday = "";
            if(bdays.length > 0){
                lastBday = " y " + bdays.pop();
                connector = "les";
            }
            if(addMiddle){
                bdays.forEach(x => {
                    bdaysString += ", " + x;
                });
            }
            
            bdaysString += lastBday;
            console.log(`Hoy es el natalicio de ${bdaysString}! Muy feliz cumpleaños ${connector} desea **La familia Bewise!**`);
            channel.send(`Hoy es el natalicio de ${bdaysString}! Muy feliz cumpleaños ${connector} desea **La familia Bewise!**`);
        }
    },{
        timezone: "America/Argentina/Buenos_Aires"
      });
          
    // When you want to start it, use:
    scheduledMessage.start();
  });

client.login(token);