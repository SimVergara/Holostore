'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holograms = sequelize.define('Holograms', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING
  }, {});
  Holograms.associate = function(models) {
    // associations can be defined here
  };
  return Holograms;
};