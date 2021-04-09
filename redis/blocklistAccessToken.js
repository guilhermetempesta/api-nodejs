const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

require('dotenv').config();  
let redisUrl = process.env.REDISCLOUD_URL;
if (process.env.NODE_ENV === 'development') {  
    redisUrl = "redis://127.0.0.1"; 
}  

const redis = require('redis');
const blocklist = redis.createClient(redisUrl, { 
    no_ready_check: true,
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