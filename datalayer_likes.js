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

    /* ================ LIKES ================ */


    getUserLikes : function(user, cb){
        db.collection("likes").find({pseudo : user}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    getLikesSet : function(cb){
        db.collection("likes").find({}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    addLike : function(like, cb){
        db.collection("likes").findOne({ pseudo: like.pseudo, videoId: like.videoId},function(err, docs) {
           if(docs==null){
                console.log("Add Like");
                db.collection("likes").insertOne(like, function(err) {
                    cb();
                });
           }
           else {
               console.log("Video already liked by : " + like.pseudo);
               cb();
           }
        });
    },

    unlike : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
      //  console.log(ident)
        db.collection("likes").deleteOne(ident, function(err, result) {
        cb();
        });
    }
};

module.exports=datalayer;