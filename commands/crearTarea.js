const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { writeCsv, files, headers } = require("../utils/writeCsv");

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

    let result = false;

    const today = new Date();
    const { day, month, year } = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };

    result = await writeCsv({
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

    const fileHeaders = headers(files[0]);

    result
      ? (msg += `✔ Se creó un nuevo registro en la tabla ${files[0].toLowerCase()}`)
      : (msg += `No fue posible crear un nuevo registro en la tabla ${files[0].toLowerCase()} ☹️`);

    const orderedFields = result
      .map((data) => {
        return {
          responsible: data.responsible,
          type: data.type,
          finishBy: data.finishBy,
        };
      })
      .flat();

    const embeddedFields = orderedFields
      .map((data) => {
        return [
          ...Object.keys(data).map((key) => {
            return {
              name: fileHeaders.find(
                (header) => Object.values(header)[0] === key
              ).title,
              value: `${data[key] || "-"}`,
              inline: true,
            };
          }),
        ];
      })
      .flat();

    const tasksDescriptions = result
      .map((data, index) => {
        return `[${data.id}] ${data.description}${
          index !== result.length - 1 ? "\n" : ""
        }`;
      })
      .join("");

    const embeddedMessage = new EmbedBuilder()
      .setColor(0x0099ff)
      .setAuthor({
        name: `ℹ️  Se creó un nuevo registro en la tabla ${files[0].toLowerCase()}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTitle(tasksDescriptions)
      .addFields(embeddedFields)
      .setTimestamp();

    await interaction.reply({ embeds: [embeddedMessage] });
  },
};
