
//datalayer
var datalayer = require('./datalayer_playlist.js');
// const youtubedl = require('youtube-dl');
const express = require('express');
const app_playlist = express();
const port = 3003;
var bodyParser = require('body-parser');

app_playlist.use(bodyParser.json());                             // to support JSON-encoded bodies
app_playlist.use(bodyParser.urlencoded({extended: true}));       // to support URL-encoded bodies

app_playlist.use(express.static(__dirname + '/public'));

var cors = require('cors')

app_playlist.use(cors());
// app_playlist.use('/',routes);

module.exports = app_playlist;


datalayer.init(function(){
    console.log('init');
    app_playlist.listen(port);
    console.log("Listening on port " + port);
});

app_playlist.get('/likes', function(req,res){
	res.sendFile('./public/pages/likes.html', {root: __dirname});
});

app_playlist.get('/search', function(req,res){
	res.sendFile('./public/pages/accueil.html', {root: __dirname});
});

app_playlist.get('/playlist', function(req,res){
	res.sendFile('./public/pages/playlist.html', {root: __dirname});
});

app_playlist.get('/videos_playlist', function(req,res){
	res.sendFile('./public/pages/videos_playlist.html', {root: __dirname});
});

app_playlist.get('/play', function(req,res){
	res.sendFile('./public/pages/play.html', {root: __dirname});
});


//Send all playlists
// app_playlist.get("/getPlaylistSet", function(req,res){
//     datalayer.getPlaylistSet(function(dtSet){
//         res.send(dtSet);
//     });
// });

//Send all user's playlist
app_playlist.get("/getUserPlaylists/:pseudo", function(req,res){
    var pseudo = req.params.pseudo;
    datalayer.getUserPlaylists(pseudo,function(dtSet){
        res.send(dtSet);
    });
});

//Send all videos from playlist
app_playlist.get("/getVideos/:playlist_id", function(req,res){
    var id = req.params.playlist_id;
    datalayer.getVideos(id,function(dtSet){
        res.send(dtSet);
    });
});


//marche mais on n'a pas besoin de créer cette méthode
app_playlist.post("/getOnePlaylist", function(req,res){
    var id = req.body.id;
    datalayer.getOnePlaylist(id,function(data){
        res.send(data);
    });
});

//create a new Playlist
app_playlist.post("/createPlaylist/:pseudo",function(req,res){
    var playlist={
        pseudo : req.params.pseudo,
        titre : req.body.name,
        listeVideo : []
    }
    datalayer.createPlaylist(playlist, function(dtSet){
        datalayer.getUserPlaylists(req.params.pseudo,function(dtSet){
            res.send(dtSet);
        });
    })
});


//add a new vid to an existing playlist
app_playlist.put("/addToPlaylist/:playlist_id", function(req,res){
    var id = req.params.playlist_id;    
    var data = req.body;
    datalayer.getOnePlaylist(id,function(playlist){
        playlist.listeVideo.push(data);
        datalayer.modifyPlaylist(id,playlist,function(){
            datalayer.getUserPlaylists(req.params.pseudo,function(dtSet){
                res.send(dtSet);
            });
        });
    });
});

//remove a video from a playlist
app_playlist.put("/removeToPlaylist/:playlist_id", function(req,res){
    var id = req.params.playlist_id;
    var idx = req.body.index;
    // var name = req.body.name;
    console.log(idx);
    datalayer.getOnePlaylist(id,function(playlist){
        // var idx = playlist.listeVideo.indexOf(name); //donne l'index de l'élément en paramètre sinon renvoie la valeur -1 si l'élément n'existe pas
        if(idx>=0){ 
            playlist.listeVideo.splice(idx,1);          //on enlève 1 élément à partir de l'indexe qui nous intéresse
        } ; 
        datalayer.modifyPlaylist(id,playlist,function(){
            datalayer.getVideos(id,function(dtSet){
                res.send(dtSet);
            });
        });
    });
});

//delete a playlist 
app_playlist.delete("/deletePlaylist/:playlist_id", function(req, res) {
    var id = req.params.playlist_id;
    datalayer.deletePlaylist(id,function(){
        datalayer.getUserPlaylists(req.params.pseudo,function(dtSet){
            res.send(dtSet);
        });
    });
 });

 app_playlist.post("/play/:id", function(req,res){
    var videoId = {
        id : req.params.id,
    };
    // console.log(videoId)
    datalayer.play(videoId,function(dtSet){
        res.send(dtSet);
    });
});