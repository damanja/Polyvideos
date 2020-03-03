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
    }
};

module.exports=datalayer;