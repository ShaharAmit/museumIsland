const mongoose = require('mongoose'),
    Users = require('../models/users');

//post
function addMuseumToFollowing(req, res) {
    const params = params.body;
    username = params.username,
        museum = params.museum;
    Users.findOne({
        username: username
    }, 'following -_id').then((doc) => {
        return doc.following;
    }).then(following => {
        const newFollowing = following;
        newFollowing.push(museum);
        Users.update({
            username: username
        }, {
            $set: {
                following: newFollowing
            }
        }, (err, docs) => {
            if (err) console.log(`query error:${err}`);
            else res.json({
                paid: true
            });
        });
    }).catch(err => console.log(err));
}

//post
function removeMuseumFromFollowing(req, res) {
    const params = req.body;
    username = params.username,
        museum = params.museum;
    Users.findOne({
        username: username
    }, 'following -_id').then((doc) => {
        return doc.following;
    }).then(following => {
        let newFollowing = following,
            filterFollowing = [];
        filterFollowing.push(museum);
        newFollowing = newFollowing.filter((el) => !filterFollowing.includes(el));
        Users.update({
            username: username
        }, {
            $set: {
                following: newFollowing
            }
        }, (err, docs) => {
            if (err) console.log(`query error:${err}`);
            else res.json({
                paid: true
            });
        });
    }).catch(err => console.log(err));
}

//post
function addMuseumToDiscounts(req, res) {
    const params = req.body;
    username = params.username,
        museum = params.museum;

    Users.findOne({
        username: username
    }, 'discounts_museums -_id').then((doc) => {
        return doc.discounts_museums;
    }).then(discounts_museums => {
        const newDiscount = discounts_museums;
        newDiscount.push(museum);
        Users.update({
            username: username
        }, {
            $set: {
                discounts_museums: newDiscount
            }
        }, (err, docs) => {
            if (err) console.log(`query error:${err}`);
<<<<<<< HEAD
            else res.json({
                added: true
            });
=======
            console.log(docs);
            res.send(JSON.stringify({
                status: "successfully added museum " + museum + " to Discounts"
            }, null, 3));
>>>>>>> 8aab67c9db1826d01e67bd56e434bdab754b608b
        });
    }).catch(err => console.log(err));
}

//post
function addGalleryToPaid(req, res) {
    const params = req.body;
    username = params.username,
        gallery = params.gallery;

    Users.findOne({
        username: username
    }, 'paid_galleries -_id').then((doc) => {
        return doc.paid_galleries;
    }).then(paid_galleries => {
        const newpaidGalleries = paid_galleries;
        newpaidGalleries.push(gallery);
        Users.update({
            username: username
        }, {
            $set: {
                paid_galleries: newpaidGalleries
            }
        }, (err, docs) => {
            if (err) console.log(`query error:${err}`);
<<<<<<< HEAD
            else {
                res.json({
                    paid: true
                });
                return docs;
            }
=======
            console.log(docs);
            res.send(JSON.stringify({
                status: "successfully added gallery " + gallery + " to Paid Galleries"
            }, null, 3));
            return docs;
>>>>>>> 8aab67c9db1826d01e67bd56e434bdab754b608b
        }).then((document) => {
            updatePreferences(username, 'gallery', document);
        });
    }).catch(err => console.log(err));
}

//post
function addObjectToPaid(req, res) {
    const params = req.body;
    username = params.username,
        item = params.item;

    Users.findOne({
        username: username
    }, 'purchases -_id').then((doc) => {
        return doc.purchases;
    }).then(purchases => {
        const newPaidObj = purchases;
        newPaidObj.push(item);
        Users.update({
            username: username
        }, {
            $set: {
                purchases: newPaidObj
            }
        }, (err, docs) => {
            if (err) console.log(`query error:${err}`);
<<<<<<< HEAD
            else {
                res.json({
                    paid: true
                });
                return docs;
            }
=======
            console.log(docs);
            res.send(JSON.stringify({
                status: "successfully added item to Paid Items "
            }, null, 3));
            return docs;
>>>>>>> 8aab67c9db1826d01e67bd56e434bdab754b608b
        }).then((document) => {
            updatePreferences(username, 'item', document);
        });
    }).catch(err => console.log(err));
}

//not by route
function updatePreferences(username, event, doc) {
    const genre = doc.genre;
    Users.findOne({
        username: username
    }, 'preferences -_id').then((doc) => {
        return doc.preferences;
    }).then(preferences => {
        let newPreferences = preferences;
        if (!newPreferences) {
            newPreferences = {};
        }
        switch (event) {
            case 'news':
                if (newPreferences[genre]) {
                    newPreferences[genre] = newPreferences[genre] + 1;
                } else {
                    newPreferences[genre] = 1;
                }
                break;
            case 'gallery':
                if (newPreferences[genre]) {
                    newPreferences[genre] = newPreferences[genre] + 5;
                } else {
                    newPreferences[genre] = 5;
                }
                break;
            case 'item':
                if (newPreferences[genre]) {
                    newPreferences[genre] = newPreferences[genre] + 3;
                } else {
                    newPreferences[genre] = 3;
                }
                break;
        }
        Users.update({
            username: username
        }, {
            $set: {
                preferences: newPreferences
            }
        }, (err, docs) => {
            if (err) console.log(`query error:${err}`)
            else console.log('success');
        });
    }).catch(err => console.log(err));
}

//not by route
function getPreferences(userName) {
    return Users.findOne({
        username: userName
    }, "preferences -_id");
}

module.exports = {
    addMuseumToDiscounts,
    removeMuseumFromFollowing,
    addMuseumToFollowing,
    addGalleryToPaid,
    addObjectToPaid,
    updatePreferences,
    getPreferences
};