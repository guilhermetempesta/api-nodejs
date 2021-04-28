const authentication = require('../middlewares/authentication');
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
        .post(authentication.bearer, user.store)
        .get(authentication.bearer, user.index)
    
    app.route('/users/:id')
        .get(authentication.bearer, user.show)         
        .put(authentication.bearer, user.update)         
        .delete(authentication.bearer, user.destroy)   
        
    app.route('/verification-email/:token')
        .get(authentication.emailVerification, user.verificationEmail)
  
    app.route('/reset-password')
        .patch(user.resetPassword)

    app.route('/change-password')        
        .patch(user.changePassword)

    app.route('/stats')
        .get(stat.index)

    app.route('/categories')
        .post(authentication.bearer, category.store)
        .get(authentication.bearer, category.index)

    app.route('/categories/tree')
        .get(authentication.bearer, category.showTree)

    app.route('/categories/:id/articles')
        .get(authentication.bearer, article.indexByCategory)
    
    app.route('/categories/:id')
        .get(authentication.bearer, category.show)         
        .put(authentication.bearer, category.update)         
        .delete(authentication.bearer, category.destroy)

    app.route('/articles')
        .post(authentication.bearer, article.store)
        .get(authentication.bearer, article.index)
    
    app.route('/articles/:id')
        .get(authentication.bearer, article.show)         
        .put(authentication.bearer, article.update)         
        .delete(authentication.bearer, article.destroy)

}