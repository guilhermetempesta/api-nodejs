const redis = require('redis');
const handleList = require('./handleList');

require('dotenv').config();  
let redisUrl = process.env.REDISCLOUD_URL;
if (process.env.NODE_ENV === 'development') {  
    redisUrl = "redis://127.0.0.1"; 
}  

const allowlist = redis.createClient(redisUrl, { 
    no_ready_check: true,
    prefix: 'allowlist-refresh-token:' 
});

module.exports = handleList(allowlist);