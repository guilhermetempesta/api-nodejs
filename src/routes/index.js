const authentication = require('../middlewares/authentication');

const { UserController } = require('../controllers/UserController');
const user = new UserController;

const { StatController } = require('../controllers/StatController');
const stat = new StatController;

module.exports = app => {

    app.route('/')
        .get((req, res, next)=>{ 
            res.status(200).json({ message: "Bem vindo(a) a minha API Node Js!" })
        })

    app.route('/signup')
        .post(user.store)

    app.route('/login')
        .post(authentication.local, user.login)
        
    app.route('/logout')
        .post([authentication.refresh, authentication.bearer], user.logout)

    app.route('/refresh-token')
        .post(authentication.refresh, user.login)    

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
}