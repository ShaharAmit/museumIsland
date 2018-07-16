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

//get artist by gallery
//@params:
//gallery,
app.get('/get_artist/:gallery',artistsCtl.artistByGallery);

//get museums by gallery
//@params:
//gallery,
app.get('/museum/:gallery',museumsCtl.museumsByGallery);

//get article by article name and author 
//@params:
//author,
//article,
//username;
app.post('/article',articlesCtl.getArticleByNA);

//get one article by date from each genre
app.get('/each_genre_article',articlesCtl.articlesByDG);

//add museum to following
//@params:
//username
//museum
app.post('/add_following_museum',usersCtl.addMuseumToFollowing);
    
//remove museum from following
//@params:
//username
//museum
app.post('/remove_following_museum',usersCtl.removeMuseumFromFollowing);

//add museum to discount museums\
//@params:
//username
//museum
app.post('/add_dicounted_museum',usersCtl.addMuseumToDiscounts);

//add gallery to paid galleries
//@params:
//username
//gallery
app.post('/add_paid_gallery',galleriesCtl.addGalleryToPaid);

//check for discount
//@params:
//username
//museum
app.post('/check_for_discount',usersCtl.checkForDiscount);

//add item to paid items
//@params:
//username
//item,
//museum
app.post('/add_paid_object',museumsCtl.addObjectToPaid);

//create gallery
//@params:
//museumName,
//galleryName, 
//artist, 
//genre, 
//pictures, 
//price, 
//picture,
//description
app.post('/create_gallery',galleriesCtl.createGallery);

//get pictures by preferences
//@params:
//username
app.post('/preferences',galleriesCtl.getPicturesByPreferences);

//get galleries by date
//@params:
app.get('/get_galleries',galleriesCtl.galleriesByDate);

//get pictures from paid gallery
//@params:
//gallery
app.get('/pictures/:gallery',galleriesCtl.picturesByGallery);

//get galleries by artist
//@params:
//artist
app.get('/galleries_by_artist/:artist',galleriesCtl.galleriesByArtist);

//check if gallery paid
//@params:
//username
//gallery
app.post('/check_paid_galleries',usersCtl.checkPaidGalleries);

//get gallery pictures
//@params:
//gallery
app.get('/get_all_gallery_pictures/:gallery',galleriesCtl.getAllPictures); 

//get galleries from muesum by gallery
//@params:
//gallery
app.get('/galleries_by_gallery/:gallery',museumsCtl.getGalleries); 

//get gallery picture
//@params:
//gallery
app.get('/get_gallery_pic/:gallery',galleriesCtl.getGalleryPicture); 

//get items from muesum by gallery
//@params:
//gallery
app.get('/get_items/:gallery',museumsCtl.getItems); 

//get items from muesum by gallery
//@params:
//username
app.post('/check_user_exist',usersCtl.checkUserExist);

//get items from muesum by gallery
//@params:
//gallery
app.get('/get_gallery_details/:gallery',galleriesCtl.getGalleryDet);


//API - index.html file
app.get('/', (req, res) => {
    res.sendfile('index.html');
});

app.all('*', (req,res) => {
    res.status(404).send({err: false, docs: 'wrong route'});
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});