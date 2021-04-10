const authentication = require('../middlewares/authentication');
const { UserController } = require('../controllers/UserController');
const user = new UserController;

module.exports = app => {

    app.route('/')
        .get((req, res, next)=>{ 
            res.status(200).json({ message: "Welcome to my API" })
        })

    app.route('/signup')
        .post(user.store); 

    app.route('/login')
        .post(authentication.local, user.login)
        
    app.route('/logout')
        .post([authentication.refresh, authentication.bearer], user.logout)

    app.route('/refresh-token')
        .post(authentication.refresh, user.login)    

    app.route('/users')
        .get(authentication.bearer, user.show)         
        .put(authentication.bearer, user.update)         
        .delete(authentication.bearer, user.destroy)   
        
    app.route('/verification-email/:token')
        .get(authentication.emailVerification, user.verificationEmail)
  
    app.route('/forgot-password')
        .patch(user.forgotPassword)

    app.route('/change-password')        
        .patch(user.changePassword)
}