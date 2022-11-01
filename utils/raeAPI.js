const { RAE } = require('rae-api');

async function getWOTDMsg() {
    let msg ="";
    const rae = new RAE();
    const wotd = await rae.getWordOfTheDay();
    console.log(wotd.getHeader());
    msg += "La palabra del día es " + wotd.getHeader() + ": ";
    const result = await rae.fetchWord(wotd.getId());
    const definitions = result.getDefinitions();
    let isFirst = true;
    definitions.forEach( x => {
        console.log(x.getDefinition());
        if(isFirst){
            isFirst = !isFirst;
        }else{
            msg += "  // ";
        }
        msg += x.getDefinition();
    });
    return msg;
}


module.exports = getWOTDMsg;