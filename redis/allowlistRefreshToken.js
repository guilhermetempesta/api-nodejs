const redis = require('redis');
const url = require('url');
const handleList = require('./handleList');

// let redisUrl = process.env.REDISCLOUD_URL;
let redisUrl = url.parse(process.env.REDISCLOUD_URL);


if (process.env.NODE_ENV === 'development') { 
    redisUrl = "redis://127.0.0.1"; 
}  

const allowlist = redis.createClient(redisUrl, { 
    no_ready_check: true,
    prefix: 'allowlist-refresh-token:' 
});

if (process.env.NODE_ENV != 'development') {
    allowlist.auth(redisURL.auth.split(":")[1]);
}


module.exports = handleList(allowlist);