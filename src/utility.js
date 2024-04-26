const fs = require('fs');

function readToString(filename) {

    try {
        // read the file as binary
        let data = fs.readFileSync(filename)
        // return the string using toString with utf8
        return data.toString('utf8'); 
    } catch (err) {
        console.log(err)
    }
}

function writeJson(filename, infoToShare) {

    try {
        fs.writeFileSync(filename, JSON.stringify(infoToShare))
    } catch (err) {
        console.log(err)
    }
}

function readJson(filename) {
    try{
        let data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {writeJson, readJson, readToString}