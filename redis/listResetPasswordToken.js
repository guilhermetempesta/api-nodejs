const redis = require('redis');
const url = require('url');
const handleList = require('./handleList');

let redisUrl = url.parse(process.env.REDISCLOUD_URL);

if (process.env.NODE_ENV === 'development') {  
    redisUrl = "redis://127.0.0.1"; 
}  

console.log(redisUrl.port, redisUrl.hostname)

const list = redis.createClient(redisUrl.port, redisUrl.hostname, { 
    no_ready_check: true,
    prefix: 'list-reset-password-token:' 
});

if (process.env.NODE_ENV != 'development') {
    blocklist.auth(redisUrl.auth.split(":")[1]);
}

module.exports = handleList(list);