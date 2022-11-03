const { SlashCommandBuilder } = require("discord.js");
const nextBirthday = require("../utils/nextBirthday");

new SlashCommandBuilder();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("proximos-cumples")
    .setDescription("Mostrar los próximos cumpleaños a partir de hoy"),
  async execute(interaction) {
    let msg = "";

    const birthdays = await nextBirthday();

    birthdays.forEach((birthday) => {
      const { name, surname, birthDate } = birthday;
      const { day, month, year } = {
        day: birthDate.getDate(),
        month: birthDate.getMonth() + 1,
        year: new Date().getFullYear() + birthDate.getFullYear(),
      };
      const monthDay = new Date(year, month - 1, day).toLocaleString("es-AR", {
        weekday: "long",
      });

      msg += `${name} ${surname} - ${monthDay} ${day}/${month}/${year}\n`;
    });

    console.log(msg);
    await interaction.reply(msg);
  },
};
