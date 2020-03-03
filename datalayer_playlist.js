var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb+srv://admin:XJLTt9DWFwK0kNLO@cluster0-ibauf.mongodb.net/test?retryWrites=true";
var uri = "mongodb+srv://mirana:ihary@cluster0-qp2kf.mongodb.net/Polyvideos?retryWrites=true";
var client = new MongoClient(uri, {useNewUrlParser:true });
var db;

var datalayer = {
    init : function(cb){
        //Initialize connection once
        client.connect(function(err) {
            if(err) throw err;
            db = client.db("Polyvideos");
            cb();
        });
    },

    getUserPlaylists : function(user, cb){
        db.collection("Playlist").find({pseudo : user}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    getPlaylistSet : function(cb){
        db.collection("Playlist").find({}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    getVideos : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        db.collection("Playlist").findOne(ident,function(err, docs) {
            cb(docs);
        });
    },

    
    getOnePlaylist : function(id,cb){
        ObjectID = require('mongodb').ObjectID;
        //console.log("id= " + id);
        var ident = {
            _id : new ObjectID(id)
        };
        //console.log(ident);
        db.collection("Playlist").findOne(ident,function(err, playlist) {
            cb(playlist);
        });
    },
    
    createPlaylist : function(playlist, cb){
        db.collection("Playlist").insertOne(playlist, function() {
            cb();
        });
    },

    modifyPlaylist : function(id, playlist, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        db.collection("Playlist").updateOne(ident, {$set: playlist}, function(err, result) {
            cb(result);
        });
    },

    deletePlaylist : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
      //  console.log(ident)
        db.collection("Playlist").deleteOne(ident, function(err, result) {
        cb();
        });
    },

    play : function(videoId,cb){
        // console.log(videoId)
        // var url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
        cb(videoId);
    }
};

//module.exports(datalayer) --> datalayer
//module.exports=datalayer;
module.exports=datalayer;