// DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// SET PORT
var PORT = process.env.PORT || 3000;

// INTIALIZE EXPRESS
var app = express();

// DATABASE MODELS
var db = require("./models");

// SERVE STATIC CONTENT FROM "PUBLIC" DIRECTORY IN APPLICATION
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// OVERRIDE WITH POST HAVING ?_method=DELETE
app.use(methodOverride("_method"));

// SET HANDLEBARS
var exphbs = require("express-handlebars");

// SERVER INITIALIZING HANDLEBARS
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// IMPORT API ROUTES
require("./routes/burger-api-routes.js")(app);

// SERVER LISTENING
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});