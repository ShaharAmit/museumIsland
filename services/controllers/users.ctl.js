const mongoose = require('mongoose'),
    Users = require('../models/users');

function addMuseumToFollowing(res,userID,museum) {
        Users.findOne({user_id: userID},'following -_id').then((doc) => {
            return doc.following;
        }).then(following => {    
            const newFollowing = following;
            newFollowing.push(museum);
            Users.update({user_id: userID},{$set: {following: newFollowing}},(err, docs) => {
                if (err) console.log(`query error:${err}`);
                console.log(docs);
                res.json(docs);
            });
        }).catch(err => console.log(err));
}

function removeMuseumFromFollowing(res,userID,museum) {
    Users.findOne({user_id: userID},'following -_id').then((doc) => {
        return doc.following;
    }).then(following => {    
        let newFollowing = following,
        filterFollowing = [];
        filterFollowing.push(museum);
        newFollowing = newFollowing.filter( ( el ) => !filterFollowing.includes( el ) );
        Users.update({user_id: userID},{$set: {following: newFollowing}},(err, docs) => {
            if (err) console.log(`query error:${err}`);
            console.log(docs);
            res.json(docs);
        });
    }).catch(err => console.log(err));
}

function addMuseumToDiscounts(res,userID,museum) {
    Users.findOne({user_id: userID},'discounts_museums -_id').then((doc) => {
        return doc.discounts_museums;
    }).then(discounts_museums => {    
        const newDiscount = discounts_museums;
        newDiscount.push(museum);
        Users.update({user_id: userID},{$set: {discounts_museums: newDiscount}},(err, docs) => {
            if (err) console.log(`query error:${err}`);
            console.log(docs);
            res.json(docs);
        });
    }).catch(err => console.log(err));
}

function addGalleryToPaid(res,userID,gallery) {
    Users.findOne({user_id: userID},'paid_galleries -_id').then((doc) => {
        return doc.paid_galleries;
    }).then(paid_galleries => {    
        const newpaidGalleries = paid_galleries;
        newpaidGalleries.push(gallery);
        Users.update({user_id: userID},{$set: {paid_galleries: newpaidGalleries}},(err, docs) => {
            if (err) console.log(`query error:${err}`);
            console.log(docs);
            res.json(docs);
        });
    }).catch(err => console.log(err));
}

function addObjectToPaid(res,userID,object) {
    Users.findOne({user_id: userID},'purchases -_id').then((doc) => {
        return doc.purchases;
    }).then(purchases => {    
        const newPaidObj = purchases;
        newPaidObj.push(object);
        Users.update({user_id: userID},{$set: {purchases: newPaidObj}},(err, docs) => {
            if (err) console.log(`query error:${err}`);
            console.log(docs);
            res.json(docs);
        });
    }).catch(err => console.log(err));
}
//discounts_museums

module.exports = {
    addMuseumToDiscounts,
    removeMuseumFromFollowing,
    addMuseumToFollowing,
    addGalleryToPaid,
    addObjectToPaid,
};