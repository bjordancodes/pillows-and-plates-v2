const admin = require("firebase-admin");
const db = admin.database();
const ref = db.ref("Organizations");

module.exports = {
    newOrg: function(req, res, next) {
        const { name, bedsAvailable, foodAvailable, address, lat, long} = req.body;
        ref.child("OrgStats").push({
          name,
          bedsAvailable,
          foodAvailable,
          address,
          lat,
          long
        });
        res.status(200).send("post successful!")
      },
      getOrg: function(req, res, next) {
        ref.once("value", function(snapshot) {
          console.log(snapshot.val());
        });
        res.sendStatus(200);
      },
      updateOrg: function(req, res, next) {
          const {id, name, bedsAvailable, foodAvailable} = req.body

          ref.child("OrgStats").update({
            id: id,
            name: name,
            bedsAvailable: bedsAvailable,
            foodAvailable: foodAvailable
          })
      }
      
}