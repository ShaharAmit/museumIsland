const mongoose = require('mongoose'),
    Testing = require('../models/testing');

function testingBla(res) {
    console.log('?');
    const test = '111',
    id = '5b220d24e7179a589281a7b8';
    Testing.find({_id: id,$or:[{test1: test},{test2: test}]},(err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
    })
}
function testingBlat(res) {
    id = '5b220d24e7179a589281a7b8';
    Testing.findById(id,(err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
    })
}

module.exports = {
    testingBla,
    testingBlat
};