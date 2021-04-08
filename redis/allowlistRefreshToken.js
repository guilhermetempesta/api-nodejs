const redis = require('redis');
const handleList = require('./handleList');

const allowlist = redis.createClient({ 
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    prefix: 'allowlist-refresh-token:' 
});

module.exports = handleList(allowlist);