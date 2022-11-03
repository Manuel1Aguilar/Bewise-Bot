const fs = require("fs");
const { parse } = require("csv-parse");

module.exports = async function checkBirthdays() {
  const today = new Date();
  let birthdayBoyGirls = [];
  const stream = fs
    .createReadStream("./documentos/Cumples_Bewise.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }));

  for await (const chunk of stream) {
    let [day, month, year] = chunk[3].split("/");
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    if (today.getDate() === day && today.getMonth() + 1 === month) {
      birthdayBoyGirls.push(chunk[0] + " " + chunk[1]);
    }
  }
  return birthdayBoyGirls;
};
