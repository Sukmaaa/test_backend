'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Epresence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Epresence.belongsTo(models.User, {
        as: "user",
        foreignKey:{
          name: "id_users"
        }
      })
    }
  };
  Epresence.init({
    type: DataTypes.STRING,
    is_approve: DataTypes.BOOLEAN,
    waktu: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Epresence',
  });
  return Epresence;
};