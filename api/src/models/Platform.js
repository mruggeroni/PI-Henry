const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Platform', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter some platform'
        },
        len: {
          args: [2,30],
          msg: 'platform must be 2 to 30 characters length'
        },
      },
    },
  }, {
    timestamps: false,
  });
};