const User = require('../models/User');
const { InvalidArgumentError } = require('../utils/errors');

class UserRepository {

    async create (data) {
        try {   
            await this.checkEmailExists(data.email);
            const user = await User.create(data);   
            return user;     
        } catch(err) {
            throw err
        }
    }

    async update (data) {
        try {
            const { firstName, lastName } = data;
            await User.update({
                    firstName: firstName,
                    lastName: lastName
                }, 
                {   
                    where: {id: data.id}
                }
            );
        } catch (err) {
            throw err
        }
    }

    async getById (id) {
        try {
            const user = await User.findOne({ 
                attributes: ['id', 'firstName', 'lastName', 'email'],
                where: {id: id} 
            })
            return user;
        } catch (err) {
            throw err
        }
    }

    async getByEmail (email) {
        try {
            const user = await User.findOne({ 
                where: {email: email} 
            })
            return user;
        } catch (err) {
            throw err
        }
    }

    async remove (id) {
        try {
            await User.destroy({
                where: {id: id} 
            });
        } catch (err) {
            throw err
        }
    }

    async checkEmailExists (email) {
        try {
            const count = await User.count({ 
                where: { email: email }
            });
            if (count>0) { 
                throw new InvalidArgumentError ('Este e-mail já foi utilizado!');
            }
        } catch (error) {
            throw error;
        } 
    }

    async verificationEmail (userId) {
        try {        
            await User.update(
                { verifiedEmail: true }, 
                { where: { id: userId }}
            )
        } catch (err) {
            throw err
        }
    }
}

module.exports = { UserRepository }