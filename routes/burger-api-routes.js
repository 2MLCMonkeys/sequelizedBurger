var express = require("express");
var db = require("../models");

module.exports = function(app) {


app.get("/", function(req, res) {
  db.Burger.findAll({
    where: {},
    include: [{
        model: db.Customer
      }]
  }).then(function (dbBurger) {
    console.log(dbBurger);
    var burgerObj = {burgers: dbBurger};
    res.render("index", burgerObj);
  })
});

app.post("/", function(req, res) {
  db.Burger.create({burger_name: req.body.name}).then(function(dbBurger) {
      res.redirect("/");
    });
});

app.post("/:id", function(req, res) {
  var customerName = req.body.customer;
  var burgerId = req.params.id;
  var resVar = res;
  db.Customer.findAll({}).then(function(dbCustomers) {
    var flag = false;
    for (var i; i < dbCustomers.length; i++) {
      if (customerName === dbCustomer[i].name) {
        flag = true;
      }
      else {
        console.log("not a match");
      }
    }
    if (!flag) {
      db.Customer.create({
          name: customerName
      }).then(function (dbCreate) {
        burgerUpdate(customerName, burgerId, resVar);
      });
    }
    else {
      burgerUpdate(customerName, burgerId, resVar);
    }
  });
});

function burgerUpdate (customerName, burgerId, resVar) {
  db.Customer.findOne({
    where: {
      name: customerName
    }
  }).then(function (dbCustomer) {
    var id = dbCustomer.id;
    db.Burger.update(
      {
        devoured: true,
        CustomerId: id
      },
      {
        where: {
          id: burgerId
        }
      }).then(function(dbBurger) {
        resVar.redirect("/");
      });
  });
};

}