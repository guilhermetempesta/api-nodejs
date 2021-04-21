const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const { InvalidArgumentError } = require('../utils/errors');

class User extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Nome não informado!' },
                    notEmpty: { msg: 'Nome não informado!' }
                }
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Sobrenome não informado!' },
                    notEmpty: { msg: 'Sobrenome não informado!' }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'E-mail não informado!' },
                    notEmpty: { msg: 'E-mail não informado!' },
                    isEmail: { msg: 'E-mail inválido!' }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Senha não informada!' },
                    notEmpty: { msg: 'Senha não informada!' },
                }
            },
            confirmPassword: {
                type: DataTypes.VIRTUAL,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Confirme a senha!' },
                    notEmpty: { msg: 'Confirme a senha!' },
                    isMatch: function () {                        
                        const matched = bcrypt.compareSync(this.confirmPassword, this.password)
                        if (!matched) { 
                            throw new Error ('As senhas não conferem!') 
                        }
                    }
                }
            },
            verifiedEmail: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            role: {
                type: DataTypes.ENUM,
                values: ['admin','user'],
                defaultValue: 'user',
            },
        }, {
            sequelize,
            tableName: 'users',                     
            paranoid: true,
            setterMethods: {
                password: function(value) {
                    if (value.trim()==='') {
                        throw new InvalidArgumentError('Senha não informada!');
                    } 
                    const salt = bcrypt.genSaltSync(10);
                    const encryptedPassword = bcrypt.hashSync(value, salt);                     
                    this.setDataValue('password', encryptedPassword);
                },
            }, 
        })
    }

    // static associate(models) {
        
    // }
}

module.exports = User;