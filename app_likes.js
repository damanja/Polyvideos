//datalayer
var datalayer = require('./datalayer_likes.js');


const express = require('express');
const app_likes = express();
const port = 3002;
var bodyParser = require('body-parser');

app_likes.use(bodyParser.json());                             // to support JSON-encoded bodies
app_likes.use(bodyParser.urlencoded({extended: true}));       // to support URL-encoded bodies

app_likes.use(express.static(__dirname + '/public'));

var cors = require('cors')

app_likes.use(cors());
// app_likes.use('/',routes);

module.exports = app_likes;

datalayer.init(function(){
    console.log('init');
    app_likes.listen(process.env.PORT || port);
    console.log("Listening on port " + port);
});

app_likes.get('/likes', function(req,res){
	res.sendFile('./public/pages/likes.html', {root: __dirname});
});

app_likes.get('/search', function(req,res){
	res.sendFile('./public/pages/accueil.html', {root: __dirname});
});

app_likes.get('/playlist', function(req,res){
	res.sendFile('./public/pages/playlist.html', {root: __dirname});
});

//Send all user's likes
app_likes.get("/getUserLikes/:pseudo", function(req,res){
    var pseudo = req.params.pseudo;
    datalayer.getUserLikes(pseudo,function(dtSet){
        res.send(dtSet);
    });
});

//Send all likes
app_likes.get("/getLikesSet", function(req,res){
    datalayer.getLikesSet(function(dtSet){
        res.send(dtSet);
    });
});

//Add Like to a video
app_likes.post("/addToLikes/:pseudo/:videoId", function(req,res) {
    var like = {
        pseudo : req.params.pseudo,
        videoId : req.params.videoId,
        title : req.body.infos.title,
        author : req.body.infos.author.name,
        views : req.body.infos.views,
        ago : req.body.infos.ago,
        timestamp : req.body.infos.timestamp,
        thumbnail : req.body.thumbnail
    };
    datalayer.addLike(like, function() {
        // datalayer.getLikesSet(function(dtSet){
        //     res.send(dtSet);
        // });
    });
});

//unlike
app_likes.delete("/unlike/:pseudo/:like_id", function(req, res) {
    var id = req.params.like_id;
    var pseudo = req.params.pseudo;
    datalayer.unlike(id,function(){
        datalayer.getUserLikes(pseudo,function(dtSet){
            res.send(dtSet);
        });
    });
 });

