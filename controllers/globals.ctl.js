const mongoose = require('mongoose');
var Globals = require('../models/globals');

//not by route
function getGlobals(global) {
    return new Promise((res, rej) => { 
        Globals.findOne({
            type: global
        },(err, docs) => {
            if (err) console.log(`query error:${err}`);
            res({fields: docs.fields});
        });
    });
}

module.exports = {
    getGlobals
};