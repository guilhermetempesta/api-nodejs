const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

const redis = require('redis');
const blocklist = redis.createClient({ 
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    prefix: 'blocklist-access-token:' 
});

const handleList = require('./handleList');
const handleBlocklist = handleList(blocklist);

function generateTokenHash(token) {
    return createHash("sha256")
        .update(token)
        .digest("hex");
} 

module.exports = {
    add: async token => {
        const expirationDate = jwt.decode(token).exp;
        const tokenHash = generateTokenHash(token);
        handleBlocklist.add(tokenHash,'',expirationDate)
    },
    containsToken: async token => {
        const tokenHash = generateTokenHash(token); 
        return handleBlocklist.contains(tokenHash)
    }
}