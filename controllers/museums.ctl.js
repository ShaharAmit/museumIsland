const mongoose = require('mongoose'),
    Museums = require('../models/museums'),
    Users = require('./users.ctl');

//get
function museumsByGallery(req,res) {
    const gallery = req.params.gallery;
    Museums.find({galleries: gallery},"-_id",(err, docs) => {
        if (err) {
            console.log(`query error:${err}`)
            res.status(404).send({err: true})
        } else {
            res.status(200).send({err: false, docs: docs})
        }
    });
}
 
//not by route
function insertGallery (galleryName, museumName) {
    return Museums.findOne({
        museum_name: museumName
    },"galleries -_id").then((doc) => {
        return doc.galleries;
    }).then(galleries => {    
        const newGalleries = galleries;
        newGalleries.push(galleryName);
        return Museums.update({
            museum_name: museumName
        },{$set: {galleries: newGalleries}});
    });
}

function addObjectToPaid(req, res) {
    const params = req.body;
        username = params.username,
        item = params.item,
        museum = params.museum,
        promises = [];

    Museums.findOne({
        museum_name: museum,
        items_for_sale: { $elemMatch: { name: item } }
    }, "items_for_sale -_id").then(doc => {
        if(doc) {
            const items = doc['items_for_sale'];
            let obj;
            for(let i=0; i<items.length; i++) {
                if(items[i].name === item) {
                    obj = {genre: items[i].genre}
                    break;
                }
            }
            promises.push(Users.addObjectToPaid(username,item,obj));

            Promise.all(promises).then((check) => {
                if(check) {
                    res.status(200).send({
                        err: false,
                        docs: true
                    })
                } else {
                    res.status(404).send({
                        err: true
                    })
                }
            }).catch(err => {
                console.log(`query error:${err}`)
                res.status(404).send({
                    err: true
                });
            });
        } else {
            res.status(404).send({
                err: true
            });
        }
    }).catch(err => {
        console.log(`query error:${err}`)
        res.status(404).send({
            err: true
        });
    });

}

function getGalleries(req,res) {
    const gallery = req.params.gallery;
    Museums.findOne({galleries: gallery},"galleries -_id",(err, docs) => {
        if (err) {
            console.log(`query error:${err}`)
            res.status(404).send({err: true})
        } else {
            res.status(200).send({err: false, docs: docs})
        }
    });
}

function getItems(req,res) {
    const gallery = req.params.gallery;
    Museums.findOne({galleries: gallery},"items_for_sale -_id",(err, docs) => {
        if (err) {
            console.log(`query error:${err}`)
            res.status(404).send({err: true})
        } else {
            res.status(200).send({err: false, docs: docs})
        }
    });
}

module.exports = {
    museumsByGallery,
    insertGallery,
    addObjectToPaid,
    getGalleries,
    getItems
};