const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Please enter the name'
        },
        len: {
          args: [3,20],
          msg: 'name must be 3 to 30 characters length'
        },
      },
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the image'
        },
        isUrl: {
          msg: 'the image must be a URL rute'
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter description'
        },
        len: {
          args: [10,500],
          msg: 'description must be 10 to 500 characters length'
        },
      },
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter released'
        },
        isDate: {
          msg: 'the released must be date'
        },
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter rating'
        },
        isFloat: {
          msg: 'the rating must be float number'
        },
        min: 0,
        max: 5,
      },
      set(value) {
        const FLOAT_2 = parseInt(value * 100) / 100;
        this.setDataValue('rating', FLOAT_2);
      },
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
};