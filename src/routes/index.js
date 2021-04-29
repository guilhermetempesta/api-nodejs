const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const { UserController } = require('../controllers/UserController');
const { CategoryController } = require('../controllers/CategoryController');
const { ArticleController } = require('../controllers/ArticleController');
const { StatController } = require('../controllers/StatController');
const { AuthController } = require('../controllers/AuthController')

const user = new UserController;
const category = new CategoryController;
const article = new ArticleController;
const stat = new StatController;
const auth = new AuthController;

module.exports = app => {

    app.route('/')
        .get((req, res, next)=>{ 
            res.status(200).json({ message: "Bem vindo(a) a minha API Node Js!" })
        })

    app.route('/signup')
        .post(user.store)

    app.route('/login')
        .post(authentication.local, auth.login)
        
    app.route('/logout')
        .post([authentication.refresh, authentication.bearer], auth.logout)

    app.route('/refresh-token')
        .post(authentication.refresh, auth.login) 
        
    app.route('/validate-token')
        .post(auth.validateToken)

    app.route('/users')
        .all(authentication.bearer)
        .post(authorization("createAny", "users"), user.store)
        .get(authorization("readAny", "users"), user.index)
    
    app.route('/users/:id')
        .all(authentication.bearer)
        .get(authorization("readAny", "users"), user.show)         
        .put(authorization("updateAny", "users"), user.update)         
        .delete(authorization("deleteAny", "users"), user.destroy)   
        
    app.route('/verification-email/:token')
        .all(authentication.emailVerification)
        .get(authorization("readAny", "userVerification"), user.verificationEmail)
  
    app.route('/reset-password')
        .patch(user.resetPassword)

    app.route('/change-password')        
        .patch(user.changePassword)

    app.route('/stats')
        .get(stat.index)

    app.route('/categories')
        .all(authentication.bearer)
        .post(authorization('createAny', 'categories'), category.store)
        .get(authorization('readAny', 'categories'), category.index)

    app.route('/categories/tree')
        .all(authentication.bearer)
        .get(authorization('readAny', 'categoriesTree'), category.showTree)

    app.route('/categories/:id/articles')
        .all(authentication.bearer)
        .get(authorization('readAny', 'articlesByCategory'), article.indexByCategory)
    
    app.route('/categories/:id')
        .all(authentication.bearer)
        .get(authorization('readAny', 'categories'), category.show)         
        .put(authorization('updateAny', 'categories'), category.update)         
        .delete(authorization('deleteAny', 'categories'), category.destroy)

    app.route('/articles')
        .all(authentication.bearer)
        .post(authorization('createAny', 'articles'), article.store)
        .get(authorization('readAny', 'articles'), article.index)
    
    app.route('/articles/:id')
        .all(authentication.bearer)
        .get(authorization('readAny', 'articlesById'), article.show)         
        .put(authorization('updateAny', 'articles'), article.update)         
        .delete(authorization('deleteAny', 'articles'), article.destroy)

}