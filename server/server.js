const express = require('express');
const { json } = require("body-parser");
const admin = require("firebase-admin");
require("firebase/database");
require("dotenv").config();
const path = require("path");
const ejs = require("ejs");
const fetch = require("node-fetch");

const serviceAccount = require("../serviceAccountKey.json");

const app = express();



app.use(json());
app.set("views", path.join(__dirname, "views"))
app.set('view engine', 'ejs');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pillows-and-plates.firebaseio.com"
  });

  const { newOrg, getOrg, updateOrg } = require("./controllers/nameController");

app.post("/name", newOrg);
app.get("/name", getOrg);
app.put("/name", updateOrg);
app.get("/", async function (req, res, next) {
  let data = [];
  await fetch("http://localhost:3001/name")
  .then(response => response.json()
  .then(response => data.push(response)))
    console.log(data[0]);
    res.render("maps", {
      data: data[0]
    });
  });


const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port} ^___^!`);
});

// THIS IS ME, YA BOI, GIVING YOU A MESSAGE THROUGH A SNEAKY COMMENT