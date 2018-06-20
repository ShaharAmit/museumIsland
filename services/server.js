const express = require('express'),
    app = express(),
    galleriesCtl = require('./controllers/galleries.ctl'),
    articlesCtl = require('./controllers/articles.ctl'),
    museumsCtl = require('./controllers/museums.ctl'),
    artistsCtl = require('./controllers/artists.ctl'),
    usersCtl = require('./controllers/users.ctl');
var bodyParser = require('body-parser');

    port = process.env.PORT || 3000;



app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('port', port);
app.use('/', express.static('./public')); //for API
app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type,Accept");
        res.set("Content-Type", "application/json");
        next();
    });
/*** All routes ***/
app.post('/', galleriesCtl.getPicturesByPreferences);

app.get('/:artist', (req,res) => {
    const artist = req.params.artist;
    galleriesCtl.galleriesByArtist(res,artist);
});


app.get('/pictures/:gallery', (req,res) => {
    const gallery = req.params.gallery;
    galleriesCtl.picturesByGallery(res,gallery);
});

//get museums by gallery
app.get('/museum/:gallery', (req,res) => {
    const gallery = req.params.gallery;
    museumsCtl.museumsByGallery(res,gallery);
});

//get artists by gallery
app.get('/artist/:gallery', (req,res) => {
    const gallery = req.params.gallery;
    artistsCtl.artistByGallery(res,gallery);
});

//follow museum
app.post('/followMuseum', (req,res) => {
    var userID = req.body.userID;
    var museum = req.body.museum;
    usersCtl.addMuseumToFollowing(res,userID,museum);
});

//unfollow museum
app.post('/unFollowMuseum', (req,res) => {
    var userID = req.body.userID;
    var museum = req.body.museum;
    usersCtl.removeMuseumFromFollowing(res,userID,museum);
});

//discount for museum
app.post('/Discount', (req,res) => {
    var userID = req.body.userID;
    var museum = req.body.museum;
    usersCtl.addMuseumToDiscounts(res,userID,museum);
});

//get article by article id
app.post('/article', (req,res) => {
    var id = req.body.id;
    var userID = req.body.userID;
    articlesCtl.getArticleById(res,id, userID);
});

//add gallery to paid galleries
app.post('/Paid/Gallery', (req,res) => {
    var userID = req.body.userID;
    var gallery= req.body.gallery;
    usersCtl.addGalleryToPaid(res,userID,gallery);
});

//add object to paid
app.post('/Paid/Object', (req,res) => {
    var userID = req.body.userID;
    var object= req.body.object;
    usersCtl.addObjectToPaid(res,userID,object);
});

//API - index.html file
app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.listen(port,
    () => {
        console.log(`listening on port ${port}`);
    });