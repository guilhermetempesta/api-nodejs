const redis = require('redis');
const url = require('url');
const handleList = require('./handleList');

// set connection string 
let redisUrl = url.parse(process.env.REDISCLOUD_URL);
if (process.env.NODE_ENV === 'development') { 
    redisUrl = "redis://127.0.0.1"; 
}  

// create list
const allowlist = redis.createClient(redisUrl.port, redisUrl.hostname, { 
    no_ready_check: true,
    prefix: 'allowlist-refresh-token:' 
});

// authenticate in redis
if (process.env.NODE_ENV != 'development') {
    allowlist.auth(redisUrl.auth.split(":")[1]);
}

module.exports = handleList(allowlist);