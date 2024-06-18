var express = require("express");
var mysql = require("mysql");

var router = express.Router();

var app = express();
var MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri =
  "mongodb+srv://anirudhagajbhiye2:E5FMisvEKCQIAAHN@anirudha.f1e2jgx.mongodb.net/?retryWrites=true&w=majority&appName=Anirudha";

const client = new MongoClient(uri);

const DB_NAME = "paradordb";
const COLLECTION_DESTINATION = "destination";

router.get("/", async function (req, res) {
  let dbo = await client.db(DB_NAME);
  let data = await dbo
    .collection(COLLECTION_DESTINATION)
    .find()
    .sort({ name: 1 })
    .toArray();
  console.log("data >> ", data);
  res.json(data);
});

router.post("/", async function (req, res) {
  let dbo = await client.db(DB_NAME);
  var myobj = req.body;
  let data = await dbo.collection(COLLECTION_DESTINATION).insertOne(myobj);
  console.log(data);

  console.log(req.body);
  const user = req.body;
  res.json({ message: "1 record inserted" });
});

router.get("/:id", async function (req, res) {
  console.log("I am id= " + req.params.id);

  let dbo = await client.db(DB_NAME);
  let data = await dbo
    .collection(COLLECTION_DESTINATION)
    .find({ _id: new ObjectId("" + req.params.id + "") })
    .toArray();
  console.log("data >> ", data);
  res.json(data[0]);
});

router.put("/:id", async function (req, res) {
  console.log("I am id= " + req.params.id);
  console.log(req.body);
  const user = req.body;

  var myquery = { _id: new ObjectId(req.params.id) };
  var newvalues = { $set: req.body };

  let dbo = await client.db(DB_NAME);
  let data = await dbo
    .collection(COLLECTION_DESTINATION)
    .updateOne(myquery, newvalues);

  res.json({ message: "1 record inserted" });
});

router.delete("/:id", function (req, res) {
  console.log("I am id= " + req.params.id);

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pass@123",
    database: "cart_app",
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `Delete FROM users where id=${req.params.id}`,
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json({ message: "User Deleted" });
      }
    );
  });
});

//Routes will go here
module.exports = router;
