module.exports = function (sequelize, DataTypes) {
  var Burger = sequelize.define("Burgers", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Burger.associate = function (models) {
    //   // We're saying that a Burgers should belong to an Author
    //   // A Burgers can't be created without an Author due to the foreign key constraint
    Burger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Burger;
};
