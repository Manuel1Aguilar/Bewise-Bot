const { SlashCommandBuilder } = require("discord.js");
const nextBirthdays = require("../utils/nextBirthdays");

new SlashCommandBuilder();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("proximos-cumples")
    .setDescription("Mostrar los próximos cumpleaños a partir de hoy")
    .addIntegerOption((option) =>
      option
        .setName("cantidad")
        .setDescription("Cantidad elementos a mostrar")
        .setRequired(false)
        .setMinValue(1)
    ),
  async execute(interaction) {
    const cantidad = interaction.options.get("cantidad", false)?.value;
    let msg = "";

    const birthdays = await nextBirthdays();

    birthdays.forEach((birthday, index) => {
      const { name, surname, birthDate } = birthday;
      const { day, month, year } = {
        day: birthDate.getDate(),
        month: birthDate.getMonth() + 1,
        year: new Date().getFullYear() + birthDate.getFullYear(),
      };
      const monthDay = new Date(year, month - 1, day).toLocaleString("es-AR", {
        weekday: "long",
      });

      if (cantidad && index < cantidad) {
        msg += `${name} ${surname} - ${monthDay} ${day}/${month}/${year}\n`;
      } else if (!cantidad) {
        msg += `${name} ${surname} - ${monthDay} ${day}/${month}/${year}\n`;
      }
    });

    console.log(msg);
    await interaction.reply(msg);
  },
};
