const tokens = require('../utils/tokens') ;

class AuthController {

  async login (req, res, next) {
    try {
        const accessToken = tokens.access.create(req.user);
        const refreshToken = await tokens.refresh.create(req.user.id);
        res.set('Authorization', accessToken);
        res.status(200).json({ refreshToken });
    } catch (error) {
        next(error)
    }
  }

  async logout (req, res, next) {
      try {
          const token = req.token;
          await tokens.access.invalidate(token);
          res.status(204).send();
      } catch (error) {
          next(error)
      }        
  }

  async validateToken (req, res, next) {
      try {
          const userData = req.body || null
          if (userData) {
              const payload = await tokens.access.check(userData.accessToken);
              if (payload) return res.send(true)
          }                        
      } catch (error) {
          res.send(false)
          //next(error)
      }
  }

}

module.exports = { AuthController }