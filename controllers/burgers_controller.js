var express = require("express");

var router = express.Router();

// IMPORT BURGER MODEL
var burger = require("../models/burger.js");

// GET BURGER DATA 
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
// POSTS CREATED BURGER
router.post("/", function(req, res) {
  burger.insertOne("burger_name",
    req.body.name, function() {
    res.redirect("/");
  });
});
// ADDS CUSTOMER TO BURGER AND UPDATES DATA
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.updateOne({
    devoured: true
  }, {id: req.params.id}, function() {
    res.redirect("/");
  });
});


// EXPORT ROUTES
module.exports = router;