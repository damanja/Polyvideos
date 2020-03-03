//manoel.deligny@gmail.com

//Application qui fonctionne format web (pas forcément joli...)
//Déployer complètement sur le web (aws,heroku...) HEROKU
//Git
//Création d'un compte utilisateur, connexion, déconnexion
//Création, modification, supression d'une tache
//Angular appelle serveur nodejs

//mlab

//Appels vers les structures de données partie business ne doit pas avoir de code par rapport à ça
// Sait où et comment sont stockées les données


var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mirana:ihary@cluster0-qp2kf.mongodb.net/Polyvideos?retryWrites=true";
var client = new MongoClient(uri, {useNewUrlParser:true });
var db;

const ytSearch = require( 'yt-search' );
var youtubeThumbnail = require('youtube-thumbnail');


var datalayer = {
    init : function(cb){
        //Initialize connection once
        client.connect(function(err) {
            if(err) throw err;
            db = client.db("Polyvideos");
            cb();
        });
    },

    /* ================ USERS ================ */

    getUserSet : function(cb){
        db.collection("users").find({}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    createUser : function(user, cb){
        db.collection("users").findOne({ pseudo: user.pseudo },function(err, docs) {
           if(docs==null){
                console.log("Inscription");
                db.collection("users").insertOne(user, function(err) {
                    cb();
                });
           }
           else {
               console.log("Pseudo déjà utilisé");
               cb();
           }
        });
    },

    getUser : function(user, cb){
        db.collection("users").findOne(user, function(err,result) {
            cb(result);
        });
    },

    /* ================ RECHERCHE ================ */

    search : function(recherche,cb){
        ytSearch(recherche.keyword, function (err, r) {
            if (err) throw err
           
            const videos = r.videos
            const playlists = r.playlists
            const accounts = r.accounts
           
            const firstResult = videos[ 0 ]
           
            console.log( videos[0] )
            cb(videos);
        })
    },

    getThumbnail : function(videoId,cb){
        var thumbnail = youtubeThumbnail('https://www.youtube.com/watch?v=' + videoId);
        console.log(thumbnail);
        cb(thumbnail.default.url);
    }
};

//module.exports(datalayer) --> datalayer
//module.exports=datalayer;
module.exports=datalayer;