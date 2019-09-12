//Imports

var express = require("express");

var app = express();

var bodyParser = require("body-parser");

var mongoose = require("mongoose");



//Config

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));



//Datebase

mongoose.connect("mongodb://localhost/1955_API")

require("./server/config/mongoose.js");



//Routes

require("./server/config/routes.js")(app);



//Port

app.listen(8000, function(){

    console.log("Listening on port: 8000");

})