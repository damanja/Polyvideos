//datalayer
var datalayer = require('./datalayer_user.js');


const express = require('express');
const app_user = express();
const port = 3000;
var bodyParser = require('body-parser');

app_user.use(bodyParser.json());                             // to support JSON-encoded bodies
app_user.use(bodyParser.urlencoded({extended: true}));       // to support URL-encoded bodies

app_user.use(express.static(__dirname + '/public'));

var cors = require('cors')

app_user.use(cors());
// app_user.use('/',routes);

module.exports = app_user;

datalayer.init(function(){
    console.log('init');
    app_user.listen(process.env.PORT || port);
    console.log("Listening on port " + port);
});

app_user.get('/', function(req,res){
	res.sendFile('./public/signin.html', {root: __dirname});
});

// app_user.get('/accueil', function(req,res){
// 	res.sendFile('./public/accueil/accueil.html', {root: __dirname});
// });


/* ================ USERS ================ */

//Send all users
app_user.get("/getUserSet", function(req,res){
    datalayer.getUserSet(function(dtSet){
        res.send(dtSet);
    });
});

//Create User
app_user.post("/createUser", function(req,res) {
    var user = {
        pseudo : req.body.pseudo,
        mdp : req.body.mdp
    };
    datalayer.createUser (user, function() {
        datalayer.getUserSet(function(dtSet){
            res.send(dtSet);
        });
    });
});

//Login
app_user.post("/login", function(req,res) {
    var user = {
        pseudo : req.body.pseudo,
        mdp : req.body.mdp
    };
    datalayer.getUser(user, function(result) {
        if (result == null){
            console.log("Echec connexion");
        }
        else {
            console.log("Connexion OK");
        }
        res.send(result);
    });
});