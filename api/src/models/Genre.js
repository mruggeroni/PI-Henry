const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter some genre'
        },
        len: {
          args: [2,30],
          msg: 'genre must be 2 to 30 characters length'
        },
      },
    },
  }, {
    timestamps: false,
  });
};