const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const Files = ["Planning", "Cumples_Bewise"];

const BirthdayColumns = [
  { id: "name", title: "Nombre" },
  { id: "surname", title: "Apellido" },
  { id: "admissionDate", title: "Fecha de ingreso" },
  { id: "birthDate", title: "Cumpleaños" },
];

const PlanningColumns = [
  { id: "id", title: "ID" },
  { id: "description", title: "Descripción" },
  { id: "type", title: "Tipo" },
  { id: "responsible", title: "Responsable" },
  { id: "createdAt", title: "Fecha de creación" },
  { id: "finishBy", title: "Fecha de finalización" },
];

function getHeader(filename) {
  switch (filename) {
    case Files[0]:
      return PlanningColumns;
    case Files[1]:
      return BirthdayColumns;
    default:
      return undefined;
  }
}

module.exports = {
  files: Files,
  writeCsv: async ({ filename, data }) => {
    const csvWriter = createCsvWriter({
      path: `./documentos/${filename}.csv`,
      header: getHeader(filename),
      fieldDelimiter: ",",
      append: true,
    });

    if (filename === Files[0]) {
      const stream = fs
        .createReadStream(`./documentos/${filename}.csv`)
        .pipe(parse({ delimiter: ",", from_line: 2 }));

      let maxId = 0;

      for await (const chunk of stream) {
        const id = parseInt(chunk[0], 10);
        maxId = id > maxId ? id : maxId;
      }

      data = data.map((_data) => {
        maxId++;
        return {
          ..._data,
          id: maxId,
        };
      });
    }

    return csvWriter
      .writeRecords(data)
      .then(() => {
        console.log(`Se crearon nuevos registros en la tabla ${filename.toLowerCase()}`, data);
        return `Se crearon nuevos registros en la tabla ${filename.toLowerCase()}`;
      })
      .catch((error) => {
        console.error(error);
        return `No fue posible crear nuevos registros en la tabla ${filename.toLowerCase()} ☹️`;
      });
  },
};
