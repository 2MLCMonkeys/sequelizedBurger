// CUSTOMER MODEL
module.exports = function(sequelize, DataTypes) {
  // CUSTOMER NAME
    var Customer = sequelize.define("Customer", {
      name: {
        type: DataTypes.STRING
      }
    });
  // LINKS CUSOMER MODEL TO BURGER MODEL
    Customer.associate = function(models) {
      // JOINS CUSTOMER TO BURGER
      Customer.hasMany(models.Burger, {
        onDelete: "cascade"
      });
    };
  
    return Customer;
  };