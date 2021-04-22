const { Model, DataTypes } = require('sequelize');

class Category extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Nome não informado!' },
                    notEmpty: { msg: 'Nome não informado!' }
                }
            }
        }, {
            sequelize,
            tableName: 'categories',                     
            paranoid: true
        })
    }

    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: 'parentId', as: 'parent' });
      this.hasMany(models.Category, { foreignKey: 'parentId', as: 'parents'});
      this.hasMany(models.Article, { foreignKey: 'categoryId', as: 'articles'});
    }
}

module.exports = Category;