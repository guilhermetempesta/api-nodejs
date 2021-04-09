const bcrypt = require('bcrypt-nodejs')
const { InvalidCredentialsError } = require('../utils/errors');

class PasswordService {

    check (password, encryptPassword) {
        const matched = bcrypt.compareSync(password, encryptPassword)
        if (!matched) {
            throw new InvalidCredentialsError;
        }
    }
}

module.exports = { PasswordService }