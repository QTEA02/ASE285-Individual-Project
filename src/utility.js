const fs = require('fs');
const { scryptSync } = require('crypto');

function readToString(filename) {
    try {
        let data = fs.readFileSync(filename);
        return data.toString('utf8'); 
    } catch (err) {
        console.log(err);
    }
}

function writeJson(filename, infoToShare) {
    try {
        fs.writeFileSync(filename, JSON.stringify(infoToShare));
    } catch (err) {
        console.log(err);
    }
}

function readJson(filename) {
    try {
        let data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
    }
}


module.exports = { writeJson, readJson, readToString};
