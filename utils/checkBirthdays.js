const fs = require("fs");
const { parse } = require("csv-parse");

module.exports = async function checkBirthdays() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    let birthdayBoyGirls = [];
    const stream = fs.createReadStream("./documentos/Cumples_Bewise.csv").pipe(parse({delimiter: ','}));

    for await (const chunk of stream) {
        const brthDate = chunk[3].split("/");
        if(brthDate[0] == day && brthDate[1] == month){
            birthdayBoyGirls.push(chunk[0] + " " + chunk[1]);
        }
    }
    return birthdayBoyGirls;
}
