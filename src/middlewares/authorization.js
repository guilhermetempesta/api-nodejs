const roles = require('../config/accessControl')

module.exports = (action, resource) => {
    return (req, res, next) => {    
        try {
            // console.log(req.user.role)
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    name: "Unauthorized",
                    message: "Acesso não autorizado!"
                });
        }
            next()
        } catch (error) {
            next(error)
        }
    }
}