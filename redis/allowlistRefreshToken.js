const redis = require('redis');
const handleList = require('./handleList');

const allowlist = redis.createClient({ prefix: 'allowlist-refresh-token:' });

module.exports = handleList(allowlist);