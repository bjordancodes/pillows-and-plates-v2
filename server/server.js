const express = require('express');
const { json } = require("body-parser");
const admin = require("firebase-admin");
require("firebase/database");
require("dotenv").config();

const serviceAccount = require("../../serviceAccountKey.json");

const app = express();
app.use(json());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pillows-and-plates.firebaseio.com"
  });

  const { newOrg, getOrg, updateOrg } = require("./controllers/nameController");

app.post("/name", newOrg);
app.get("/name", getOrg);
app.put("/name", updateOrg);

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port} ^___^!`);
});

// THIS IS ME, YA BOI, GIVING YOU A MESSAGE THROUGH A SNEAKY COMMENT