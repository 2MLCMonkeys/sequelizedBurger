// BURGER MODEL
module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    // NAME OF BURGER
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // DEFINES WHETHER OR NOT CUSTOMER HAS EATEN BURGER 
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
// LINKS BURGER AND CUSTOMER MODELS
Burger.associate = function(models) {
    // JOINS BURGER TO CUSTOMER
    Burger.belongsTo(models.Customer, {
      foreignKey: {
      }
    });
};

  return Burger;
};