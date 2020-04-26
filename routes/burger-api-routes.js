// LINKS TO DATABASE
var db = require("../models");
// EXPORTS TO SERVER
module.exports = function(app) {

// CHECKS DATABASE FOR ALL BURGERS
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
// ADDS BURGER TO DATABASE 
app.post("/", function(req, res) {
  db.Burger.create({burger_name: req.body.name}).then(function(dbBurger) {
      res.redirect("/");
    });
});
// IF BURGER IS EATEN BY A CUSTOMER
app.post("/:id", function(req, res) {
  var customerName = req.body.customer;
  var burgerId = req.params.id;
  var resVar = res;
  // LOOKS IF CUSTOMER ALREADY EXISTS
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
    // IF CUSTOMER DOES NOT EXIST CREATES A NEW ONE
    if (!flag) {
      db.Customer.create({
          name: customerName
        // JOINS BURGER TO CUSTOMER
      }).then(function (dbCreate) {
        burgerUpdate(customerName, burgerId, resVar);
      });
    }
    else {
      burgerUpdate(customerName, burgerId, resVar);
    }
  });
});
// UPDATES THE BURGER BOOLEAN IF A CUSTOMER SELECTS IT AND EATS IT
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