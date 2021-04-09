const bcrypt = require('bcrypt-nodejs')
const { InvalidCredentialsError } = require('../utils/errors');

class CheckPasswordService {

    execute (password, encryptPassword) {
        const matched = bcrypt.compareSync(password, encryptPassword)
        if (!matched) {
            throw new InvalidCredentialsError;
        }
    }
}

module.exports = { CheckPasswordService }