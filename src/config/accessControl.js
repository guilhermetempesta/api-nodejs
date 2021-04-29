const AccessControl = require('accesscontrol')
const ac = new AccessControl()

ac.grant('user')
    .readAny('userVerification')
    .readAny('categoriesTree')
    .readAny('categoriesById')
    .readAny('articlesById')
    .readAny('articlesByCategory')
    .readAny('stats')

ac.grant('admin')
    .extend('user')
    .readAny('users')
    .createAny('users')
    .updateAny('users')
    .deleteAny('users')
    .readAny('categories')
    .createAny('categories')
    .updateAny('categories')
    .deleteAny('categories')
    .readAny('articles')
    .createAny('articles')
    .updateAny('articles')
    .deleteAny('articles')

    
module.exports = ac