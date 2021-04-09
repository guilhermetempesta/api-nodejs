const redis = require('redis');
const handleList = require('./handleList');

const list = redis.createClient({ prefix: 'list-reset-password-token:' });

module.exports = handleList(list);