const axios = require('axios');

async function getTime(url) {
    let datetime;
    let dateObj
    try{
        await axios({
            url:url,
            method: "get",
        })
            .then((response) => {
                dateObj = response.data;
                datetime = dateObj.datetime;
            })
            .catch((err) => {
                console.log(err);
            });
            console.log("datetime: " + datetime);
            return datetime;
    }catch (e){
        console.error(e);
    }

}

module.exports = getTime;