const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const redis = require('redis');
const url = require('url');

// set connection string 
let redisUrl = url.parse(process.env.REDISCLOUD_URL);
if (process.env.NODE_ENV === 'development') {  
    redisUrl = "redis://127.0.0.1"; 
}  

// create list
const blocklist = redis.createClient(redisUrl.port, redisUrl.hostname, { 
    no_ready_check: true,
    prefix: 'blocklist-access-token:' 
});

// authenticate in redis
if (process.env.NODE_ENV != 'development') {
    blocklist.auth(redisUrl.auth.split(":")[1]);
}

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