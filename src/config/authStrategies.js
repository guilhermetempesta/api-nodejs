const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const { UserRepository } = require('../repositories/UserRepository');
const { CheckPasswordService } = require('../services/CheckPasswordService');
const { InvalidCredentialsError, EmailNotVerifiedError } = require('../utils/errors');
const tokens = require('../utils/tokens'); 

passport.use(
  new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    }, 
    async (email, password, done) => {
      try {
        const userRepository = new UserRepository;
        const checkPasswordService = new CheckPasswordService();

        const user = await userRepository.getByEmail(email)
        if (!user) { throw new InvalidCredentialsError }
        checkPasswordService.execute(password, user.password)
        if (!user.verifiedEmail) { throw new EmailNotVerifiedError }
        done(null, user)
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = await tokens.access.check(token);
        done(null, { ...payload }, { token: token });
      } catch (error) {
        done(error);
      }      
    }
  )
);