const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { getUnixTime, add } = require('date-fns');

const authSecret = process.env.AUTH_SECRET;
const { InvalidArgumentError } = require('./errors');

const blocklistAccessToken = require('../../redis/blocklistAccessToken');
const allowlistRefreshToken = require('../../redis/allowlistRefreshToken');
const listResetPasswordToken = require('../../redis/listResetPasswordToken');

function createJwtToken (user, expiration) {
    const now = Math.floor(Date.now() / 1000); // data atual em formato unix
    expirationDate = now + expiration;         // soma data atual com tempo de expiração

    console.log(now, expiration, expirationDate)

    const payload = {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        account: user.accountId,
        iat: now,
        exp: expirationDate
    }

    const token = jwt.sign(payload, authSecret)
    return token
}

async function checkJwtToken(token, name, blocklist) {
  await checkTokenInBlocklist(token, name, blocklist);
  const payload = jwt.verify(token, authSecret);
  return payload;
}

async function checkTokenInBlocklist (token, name, blocklist) {
  if (!blocklist) {
    return;
  }
  const tokenInBlocklist = await blocklist.containsToken(token);
    if (tokenInBlocklist) {
        throw new jwt.JsonWebTokenError(`${name} inválido por logout!`);
    }
}

function invalidateJwtToken(token, blocklist) {
  return blocklist.add(token);
}

async function createOpaqueToken (id, expiration, allowlist) {
  const opaqueToken = crypto.randomBytes(32).toString('hex');
  await allowlist.add(opaqueToken, id, expiration);
  return opaqueToken;
}

async function checkOpaqueToken(token, name, allowlist) {
  checkSentToken(token, name);
  const id = await allowlist.getValue(token);
  checkValidToken(id, name);
  return id;
}

function checkSentToken(token, name) {
  if (!token) {
    throw new InvalidArgumentError(`${name} não enviado!`);
  }
}

function checkValidToken(id, name) {
  if (!id) {
    throw new InvalidArgumentError(`${name} inválido!`);
  }
}

async function invalidateOpaqueToken(token, allowlist) {
  await allowlist.delete(token);
}

function getAccountFromToken (token) {
  try {
    let base64Url = token.split('.')[1]; // token you get
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
    const account = decodedData.account
    return account
  } catch (error) {
    return null
  } 
}


module.exports = {
  access: {
    name: 'Access Token',
    list: blocklistAccessToken,
    expirationTime: (60 * 60 * 8 * 1), // production:  expira em 8 horas
    expirationTimeDev: (60 * 60 * 8 * 1), // development: expira em 10 segundos
    create(user) {
      let exp;
      (process.env.NODE_ENV=='development') ? exp=this.expirationTimeDev : exp=this.expirationTime;
      return createJwtToken(user, exp);
    },
    check(token) {
      return checkJwtToken(token, this.name, this.list);
    },
    invalidate(token) {
      return invalidateJwtToken(token, this.list);
    },
    getAccount(token) {
      return getAccountFromToken(token);
    }
  },

  refresh: {
    name: 'Refresh Token',
    list: allowlistRefreshToken,
    expiration: getUnixTime(add(new Date(),{days:1})), // exemplo usando date-fns
    create(id) {
      return createOpaqueToken(id, this.expiration, this.list);
    },
    check(token) {
      return checkOpaqueToken(token, this.name, this.list);
    },
    invalidate(token) {
      return invalidateOpaqueToken(token, this.list);
    }
  },

  emailVerification: {
    name: 'Token de verificação de e-mail',
    expiration: getUnixTime(add(new Date(),{hours:1})), // exemplo usando date-fns
    create(user) {
      return createJwtToken(user, this.expiration);
    },
    check(token) {
      return checkJwtToken(token, this.name);
    }
  }, 

  resetPassword: {
    name: 'Token de redefinição de senha',
    list: listResetPasswordToken,
    expiration: getUnixTime(add(new Date(),{hours:1})), // exemplo usando date-fns
    create(id) {
      return createOpaqueToken(id, this.expiration, this.list);
    },
    check(token) {
      return checkOpaqueToken(token, this.name, this.list);
    },
    invalidate(token) {
      return invalidateOpaqueToken(token, this.list);
    }
  },

};
