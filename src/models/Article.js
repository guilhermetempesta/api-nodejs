const { Model, DataTypes } = require('sequelize');

class Article extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Nome não informado!' },
                    notEmpty: { msg: 'Nome não informado!' }
                }
            }, 
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Descrição não informada!' },
                    notEmpty: { msg: 'Descrição não informada!' }
                }
            },
            imageUrl: DataTypes.STRING,
            content: {
                type: DataTypes.BLOB,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Conteúdo não informado!' },
                    notEmpty: { msg: 'Conteúdo não informado!' }
                }
            }
        }, {
            sequelize,
            tableName: 'articles',                     
            paranoid: true
        })
    }

    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    }
}

module.exports = Article;