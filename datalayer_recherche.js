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

    /* ================ RECHERCHE ================ */

    search : function(recherche,cb){
        ytSearch(recherche.keyword, function (err, r) {
            if (err) throw err
           
            const videos = r.videos
            const playlists = r.playlists
            const accounts = r.accounts
           
            const firstResult = videos[ 0 ]
           
            // console.log( videos )

            res = []
            for(var i = 0; i<videos.length; i++){
                var video_infos = videos[i];
                var youtubeThumbnail = require('youtube-thumbnail');
                var thumbnail = youtubeThumbnail('https://www.youtube.com/watch?v=' + videos[i].videoId);
                var video = {
                    thumbnail : thumbnail.high.url,
                    infos : video_infos
                }
                res.push(video)
            }

            // console.log(res[0])
            cb(res);
        })
    },

    play : function(videoId,cb){
        // console.log(videoId)
        // var url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
        cb(videoId);
    }

    // addLike : function(like, cb){
    //     db.collection("likes").findOne({ pseudo: like.pseudo, videoId: like.videoId},function(err, docs) {
    //        if(docs==null){
    //             console.log("Add Like");
    //             db.collection("likes").insertOne(like, function(err) {
    //                 cb();
    //             });
    //        }
    //        else {
    //            console.log("Video already liked by : " + like.pseudo);
    //            cb();
    //        }
    //     });
    // }
};

//module.exports(datalayer) --> datalayer
//module.exports=datalayer;
module.exports=datalayer;