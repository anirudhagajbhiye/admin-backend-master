var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var cookieParser = require("cookie-parser");
var upload = multer();
var app = express();
var cors = require("cors");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cors());
app.options("*", cors());
//Require the Router we defined in movies.js
var movies = require("./movies.js");
var users = require("./users.js");
var rooms = require("./rooms.js");
var destination = require("./destination.js");


//Use the Router on the sub route /movies
app.use("/movies", movies);
app.use("/users", users);
app.use("/rooms", rooms);
app.use("/destination", destination);


// app.use(cors());

var corsOptions = {
  origin: "http://localhost:3001/Home",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.listen(3001);
