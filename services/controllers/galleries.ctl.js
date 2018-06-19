const mongoose = require('mongoose'),
    Galleries = require('../models/galleries');

function getData(res) {
    Galleries.find({},(err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
        return;
    });
}

function galleriesByDate(res) {
    Galleries.find({}, (err, docs) => {
            if (err) console.log(`query error:${err}`);
            console.log(docs);
            res.json(docs);
            return;
        }).sort({
            'timestamp': 'descending'
        })
        .limit(3);
}


function galleriesByArtist(res, artist) {
    Galleries.find({
        artist: artist
    }, (err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
    })
}

function picturesByGallery(res, gallery) {
    Galleries.findOne({
        gallery_name: gallery
    }, "pictures -_id", (err, doc) => {
        if (err) console.log(`query error:${err}`);
        const pictures = doc.pictures.slice(0, 3);
        res.json({pictures: pictures});
    })
}


module.exports = {
    galleriesByArtist,
    galleriesByDate,
    picturesByGallery,
    getData
};