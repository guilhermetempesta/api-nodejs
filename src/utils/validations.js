const { InvalidArgumentError } = require('../utils/errors');

function isUUID (uuid) {
    let s = "" + uuid;    
    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
      return false;
    }
    return true;
}


module.exports = {

    checkIsNumeric (number) {
        if (isNaN (number)) { throw new InvalidArgumentError ('O valor informado não é um número válido!') }
    },
      
    checkIsUUID (uuid) {
        if (!isUUID (uuid)) { throw new InvalidArgumentError ('O valor informado não é um UUID válido!') }
    },
}    