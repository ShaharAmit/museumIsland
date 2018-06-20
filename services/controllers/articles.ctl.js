    const Articles = require('../models/articles'),
    globlasCtl = require('./globals.ctl');
    usersCtl = require('./users.ctl')

//post article by name and author
function getArticleByNA(req, res) {
    const params = req.body;
        author = params.author,
        article = params.article;
        username = params.username

    Articles.findOne({
        author: author, article_name: article
    },"article_name author genre content picture -_id",
    (err, doc) => {
        if (err) console.log(`query error:${err}`);
        res.json(doc);
        return doc;
    }).then((document) => {
        usersCtl.updatePreferences(username,'news',document);
    });
}

//get one article by date from each genre
function articlesByDG(req,res) {
    genre = 'genre';
    var promises = [];
    globlasCtl.getGlobals('genre').then(genres => {
        fields = genres.fields;
        fields.forEach(genre => {
            promises.push(Articles.findOne({
                genre: genre
            },"article_name author genre picture -_id",(err, doc) => { 
                if (err) console.log(`query error:${err}`);
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
    getArticleByNA
};