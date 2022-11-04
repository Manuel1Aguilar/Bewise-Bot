const { SlashCommandBuilder } = require("discord.js");
const { writeCsv, files } = require("../utils/writeCsv");

new SlashCommandBuilder();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("crear-tarea")
    .setDescription("Agregar una tarea al planning")
    .addStringOption((option) =>
      option
        .setName("descripcion")
        .setDescription("Detalle de la tarea")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("tipo")
        .setDescription("Tipo de la tarea")
        .setRequired(false)
        .addChoices(
          { name: "Bug", value: "Bug" },
          { name: "Feature", value: "Feature" },
          { name: "Otro", value: "Otro" }
        )
    )
    .addUserOption((option) =>
      option
        .setName("responsable")
        .setDescription("A quién le vas a asignar la tarea?")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("finalizacion")
        .setDescription("Fecha de finalización de la tarea")
        .setRequired(false)
    ),
  async execute(interaction) {
    const descripcion = interaction.options.get("descripcion", true).value;
    const tipo = interaction.options.get("tipo", false)?.value;
    const responsable = interaction.options.get("responsable", false);
    const finalizacion = interaction.options.get("finalizacion", false)?.value;

    let msg = "";

    const today = new Date();
    const { day, month, year } = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };

    msg += await writeCsv({
      filename: files[0],
      data: [
        {
          description: descripcion,
          createdAt: `${day}/${month}/${year}`,
          type: tipo,
          responsible: responsable?.user?.username,
          finishBy: finalizacion,
        },
      ],
    });

    await interaction.reply(msg);
  },
};
