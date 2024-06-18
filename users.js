var express = require("express");
var router = express.Router();

var mysql = require("mysql");

var cors = require("cors");
var app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200, //somoe legacy browsers (IE11, varoius SmartTVs) choke on 204
};

router.get("/", cors(corsOptions), function (req, res) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pass@123",
    database: "cart_app",
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM customers", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  });
});

//Routes will go here

module.exports = router;
