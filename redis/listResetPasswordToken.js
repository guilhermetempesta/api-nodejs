const redis = require('redis');
const handleList = require('./handleList');

const list = redis.createClient({ 
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    prefix: 'list-reset-password-token:' 
});

module.exports = handleList(list);