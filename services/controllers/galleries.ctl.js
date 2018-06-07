const mongoose = require('mongoose'),
    Galleries = require('../models/galleries'),
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

function galleriesByDate(req, res) {
    Galleries.find({},(err, docs) => {
        if (err) console.log(`query error:${err}`);
            console.log(docs);
            res.json(docs);
            return;
    }).sort({'timestamp': 'descending'})
    .limit(3);
}

//get one gallery by date and from each genre
function galleryByDG(req, res, global) {
    globlasCtl.getGlobals(global).then(genres => {
        fields = genres.fields
        console.log('fields',fields);
        fields.forEach(genre => {
            console.log('genere',genre);
            Galleries.find({
                genre: genre
            },(err, docs) => {
                if (err) console.log(`query error:${err}`);
                console.log(docs);
                return;
            }).sort({'timestamp': 'descending'})
            .limit(2);
        });
    res.json({'test': 'test'});
    });
}

module.exports = {
    galleryByDG,
    galleriesByDate
};