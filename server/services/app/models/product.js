'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, { foreignKey: `categoryId` })
      this.hasMany(models.Image, { foreignKey: `productId` })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Name is required!` },
        notEmpty: { msg: `Name is required!` }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `slug is required!` },
        notEmpty: { msg: `slug is required!` }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Description is required!` },
        notEmpty: { msg: `Description is required!` }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Price is required!` },
        notEmpty: { msg: `Price is required!` },
        min: { args: 100000, msg: `Minimum price is Rp. 100.000,00!` }
      }
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Main Image is required!` },
        notEmpty: { msg: `Main Image is required!` }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      onDelete: `CASCADE`,
      onUpdate: `CASCADE`
    },
    authorId: {
      type: DataTypes.INTEGER,
      onDelete: `CASCADE`,
      onUpdate: `CASCADE`
    },
    authorMongoId: {
      type: DataTypes.INTEGER,
      onDelete: `CASCADE`,
      onUpdate: `CASCADE`
    }
  }, {
    sequelize,
    modelName: 'Product',
    hooks: {
      beforeValidate(instance) {
        const slug = instance.name.split(` `).join(`-`)
        instance.slug = slug
      } 
    }
  });
  return Product;
};