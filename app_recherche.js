//datalayer
var datalayer = require('./datalayer_recherche.js');


const express = require('express');
const app_recherche = express();
const port = 3001;
var bodyParser = require('body-parser');

app_recherche.use(bodyParser.json());                             // to support JSON-encoded bodies
app_recherche.use(bodyParser.urlencoded({extended: true}));       // to support URL-encoded bodies

app_recherche.use(express.static(__dirname + '/public'));

var cors = require('cors')

app_recherche.use(cors());
// app_recherche.use('/',routes);

module.exports = app_recherche;

datalayer.init(function(){
    console.log('init');
    app_recherche.listen(process.env.PORT || port);
    console.log("Listening on port " + port);
});

app_recherche.get('/accueil', function(req,res){
	res.sendFile('./public/pages/accueil.html', {root: __dirname});
});

app_recherche.get('/play', function(req,res){
	res.sendFile('./public/pages/play.html', {root: __dirname});
});

app_recherche.get('/likes', function(req,res){
	res.sendFile('./public/pages/likes.html', {root: __dirname});
});

app_recherche.get('/playlist', function(req,res){
	res.sendFile('./public/pages/playlist.html', {root: __dirname});
});

//Search
app_recherche.post("/search", function(req,res){
    var recherche = {
        keyword : req.body.keyword,
    };
    datalayer.search(recherche,function(dtSet){
        res.send(dtSet);
    });
});

app_recherche.post("/play/:id", function(req,res){
    var videoId = {
        id : req.params.id,
    };
    // console.log(videoId)
    datalayer.play(videoId,function(dtSet){
        res.send(dtSet);
    });
});

// //Add Like to a video
// app_recherche.post("/addToLikes/:pseudo/:videoId", function(req,res) {
//     var like = {
//         pseudo : req.params.pseudo,
//         videoId : req.params.videoId,
//         title : req.body.infos.title,
//         author : req.body.infos.author.name,
//         views : req.body.infos.views,
//         ago : req.body.infos.ago,
//         timestamp : req.body.infos.timestamp,
//         thumbnail : req.body.thumbnail
//     };
//     datalayer.addLike(like, function() {
//         // datalayer.getLikesSet(function(dtSet){
//         //     res.send(dtSet);
//         // });
//     });
// });