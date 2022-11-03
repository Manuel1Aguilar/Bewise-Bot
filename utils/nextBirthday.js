const fs = require("fs");
const { parse } = require("csv-parse");

module.exports = async function checkBirthdays() {
  let birthdayBoyGirls = [];
  const stream = fs
    .createReadStream("./documentos/Cumples_Bewise.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }));

  for await (const chunk of stream) {
    const [day, month, year] = chunk[3].split("/");

    birthdayBoyGirls.push({
      name: chunk[0],
      surname: chunk[1],
      birthDate: new Date(year, month - 1, day),
    });
  }

  // ? Filtrar los próximos cumpleaños del año
  birthdayBoyGirls = birthdayBoyGirls.map((birthday) => {
    const today = new Date().setFullYear(0);
    birthday.birthDate.setFullYear(0);

    // ? Verificar si la fecha de birthDate
    // ? es mayor que la fecha actual
    if (today - birthday.birthDate > 0) {
      // ? Asignarle un año más para no borrar el registro
      // ? y mostrar los del año próximo
      birthday.birthDate.setFullYear(1);
    }
    return birthday;
  });

  // ? Ordenar por fecha más próxima
  birthdayBoyGirls = birthdayBoyGirls.sort((birthdayA, birthdayB) => {
    return birthdayA.birthDate - birthdayB.birthDate;
  });

  return birthdayBoyGirls;
};
