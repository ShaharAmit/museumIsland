const mongoose = require('mongoose');
var Globals = require('../models/globals');

function getGlobals(global) {
    console.log('test')
    return new Promise((res, rej) => { 
        Globals.findOne({
            type: global
        },(err, docs) => {
            if (err) console.log(`query error:${err}`);
            console.log(docs.fields);
            res({fields: docs.fields});
        });
    });
}

module.exports = {
    getGlobals
};