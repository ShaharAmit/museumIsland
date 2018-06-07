const mongoose = require('mongoose'),
    Articles = require('../models/articles'),
    globlasCtl = require('./globals.ctl');

exports.getData = (req, res) => {
    Galleries.find({},
        (err, docs) => {
            if (err) console.log(`query error:${err}`);
            console.log(docs);
            res.json(docs);
            return;
        });
}

function saveData(req, res) {

}

//get one article by date and from each genre
function areticleByDG(req, res, global) {
    var promises = [];
    globlasCtl.getGlobals(global).then(genres => {
        fields = genres.fields
        console.log('fields',fields);
        fields.forEach(genre => {
            console.log('genere',genre);
            promises.push(Articles.findOne({
                genre: genre
            },(err, doc) => {
                if (err) console.log(`query error:${err}`);
                console.log(doc);
                return doc;
            }).sort({'timestamp': 'descending'}));
        });
        Promise.all(promises).then(docs => {
            res.json({'docs': docs});
        });
    });
}

module.exports = {
    areticleByDG
};