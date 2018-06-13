    const Articles = require('../models/articles'),
    globlasCtl = require('./globals.ctl');

function getArticleById(res, id) {
    Articles.findById(id,(err, docs) => {
        if (err) console.log(`query error:${err}`);
        console.log(docs);
        res.json(docs);
        return;
    });
}

//get one article by date from each genre
function articlesByDG(res) {
    genre = 'genre';
    var promises = [];
    globlasCtl.getGlobals('genre').then(genres => {
        fields = genres.fields
        console.log('fields',fields);
        fields.forEach(genre => {
            console.log('genere',genre);
            promises.push(Articles.findOne({
                genre: genre
            },(err, doc) => {
                if (err) console.log(`query error:${err}`);
                console.log('doc',doc);
                return doc;
            }).sort({'timestamp': 'descending'}));
        });
        Promise.all(promises).then(docs => {
            res.json({'docs': docs});
        });
    });
}

module.exports = {
    articlesByDG,
    getArticleById
};