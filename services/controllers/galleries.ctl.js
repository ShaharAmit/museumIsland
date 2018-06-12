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
};


function saveData(req, res) {

}

function galleriesByDate(req, res) {
    Galleries.find({}, 'title artist', (err, docs) => {
        function galleriesByDate(req, res) {
            Galleries.find({}, (err, docs) => {
                if (err) console.log(`query error:${err}`);
                console.log(docs);
                res.json(docs);
                return;
            }).sort({'timestamp': 'descending'})
                .limit(3);
        }
    });
}

        function galleriesByArtist(req, res, artist) {
            Galleries.find({artist: artist}, (err, docs) => {
                if (err) console.log(`query error:${err}`);
                console.log(docs);
                res.json(docs);
            })
        }

        function picturesByGallery(req, res, pictures) {
            Galleries.find({pictures: pictures}, (err, docs) => {
                if (err) console.log(`query error:${err}`);
                console.log(docs);
                res.json(docs);
            })
        }


        module.exports = {
            galleriesByArtist,
            galleriesByDate,
            picturesByGallery
        };









