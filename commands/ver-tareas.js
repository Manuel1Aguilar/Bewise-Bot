const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const getTasks = require("../utils/getTasks");
const { files } = require("../utils/writeCsv");

new SlashCommandBuilder();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ver-tareas")
    .setDescription("Mostrar las tareas pendientes")
    .addIntegerOption((option) =>
      option
        .setName("cantidad")
        .setDescription("Cantidad elementos a mostrar")
        .setRequired(false)
        .setMinValue(1)
    )
    .addUserOption((option) =>
      option
        .setName("responsable")
        .setDescription("Filtrar según responsable")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("ordenar")
        .setDescription("Elegí un criterio de ordenamiento")
        .setRequired(false)
        .addChoices(
          { name: "⬆️ Descripción", value: "description,asc" },
          { name: "⬇️ Descripción", value: "description,desc" },
          { name: "⬆️ Tipo", value: "type,asc" },
          { name: "⬇️ Tipo", value: "type,desc" },
          { name: "⬆️ Fecha de creación", value: "createdAt,asc" },
          { name: "⬇️ Fecha de creación", value: "createdAt,desc" },
          { name: "⬆️ Fecha de finalización", value: "finishBy,asc" },
          { name: "⬇️ Fecha de finalización", value: "finishBy,desc" }
        )
    ),
  async execute(interaction) {
    const cantidad = interaction.options.get("cantidad", false)?.value;
    const responsable = interaction.options.get("responsable", false);
    const orderBy = interaction.options.get("ordenar", false)?.value;
    const filters = {
      responsible: responsable?.user?.username,
    };

    let emptyEmbedsMsg = "No hay tareas que cumplan el criterio de búsqueda";
    let embeds = [];

    console.log("filters data", filters);
    console.log("order by", orderBy);
    const tasks = await getTasks(filters, orderBy);

    tasks.forEach((task, index) => {
      const taskDescription = `[${task.id}] ${task.description}`;

      const obfuscatedColumns = [
        { id: "createdAt", title: "Fecha de creación" },
        { id: "type", title: "Tipo" },
        { id: "responsible", title: "Responsable" },
        { id: "finishBy", title: "Fecha de finalización" },
      ];

      const obfuscatedTask = {
        createdAt: task.createdAt,
        type: task.type,
        responsible: task.responsible,
        finishBy: task.finishBy,
      };

      const embeddedTask = Object.keys(obfuscatedTask)
        .map((key, index) => {
          return {
            name: obfuscatedColumns[index].title,
            value: `${task[key] || "-"}`,
            inline: true,
          };
        })
        .flat();

      const embeddedMessage = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(taskDescription)
        .addFields(embeddedTask)
        .setTimestamp();

      if (cantidad && index < cantidad) {
        embeds.push(embeddedMessage);
      } else if (!cantidad) {
        embeds.push(embeddedMessage);
      }
    });

    await interaction.reply({
      content: !embeds.length ? emptyEmbedsMsg : "",
      embeds: embeds,
      ephemeral: true,
    });
  },
};
