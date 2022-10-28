const axios = require('axios');
const { currencyApiKey  } = require('../config.json');

async function getValue(from, to) {
    try{
        await axios({
            url:`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=1`,
            method: "get",
            headers: {
                apiKey: currencyApiKey
            }
            })
            .then((response) => {
                console.log(response);
                obj = response.data;
                res = obj.info.rate;
            })
            .catch((err) => {
                console.log(err);
            });
            console.log("Value response: " + res);
            return res;
    }catch (e){
        console.error(e);
    }

}

module.exports = getValue;