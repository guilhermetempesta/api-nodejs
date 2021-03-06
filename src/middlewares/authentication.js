const { UserRepository } = require('../repositories/UserRepository');
const { UnauthorizedError, InvalidCredentialsError } = require('../utils/errors');
const passport = require('passport');
const tokens = require('../utils/tokens');

module.exports = {
  
  local (req, res, next) {
    passport.authenticate(
        'local',
        { session: false },
        (error, user, info) => {

            if (error) { return next(error) }
            if (!user) { throw new InvalidCredentialsError }
        
            req.user = user;
            return next();
      }
    )(req, res, next);
  },

  bearer (req, res, next) {
    passport.authenticate(
        'bearer',
        { session: false },
        (error, user, info) => {

            if (error) { return next(error) }
            if (!user) { throw new UnauthorizedError }

            req.token = info.token;
            req.user = user;
            return next();
      }
    )(req, res, next);
  },

  async refresh (req, res, next) {
    try {
        const { refreshToken } = req.body;
        const id = await tokens.refresh.check(refreshToken);
        await tokens.refresh.invalidate(refreshToken);
        const userRepository = new UserRepository;
        req.user = await userRepository.getById(id);
        return next();
    } catch (error) { 
        next(error)
    }  
  },

  async emailVerification (req, res, next) {
    try {
      const { token } = req.params;
      const payload = await tokens.emailVerification.check(token);
      const userRepository = new UserRepository;
      const user = await userRepository.getById(payload.id);
      req.user = user;
      next();
    } catch (error) {
      next(error)
    }
  },

}