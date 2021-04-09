const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const redis = require('redis');
const url = require('url');

let redisUrl = url.parse(process.env.REDISCLOUD_URL);

if (process.env.NODE_ENV === 'development') {  
    redisUrl = "redis://127.0.0.1"; 
}  

console.log(redisUrl.port, redisUrl.hostname)


const blocklist = redis.createClient(redisUrl.port, redisUrl.hostname, { 
    no_ready_check: true,
    prefix: 'blocklist-access-token:' 
});

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