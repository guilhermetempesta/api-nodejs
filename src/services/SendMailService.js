const tokens = require('../utils/tokens');    
const { VerificationEmail, PasswordResetEmail, ChangePasswordEmail } = require('../config/email');

function generateLink(token) {
    return `${process.env.VERIF_EMAIL_URL}${token}`;
  }

class SendMailService {

  verification (user) {
      try {
        const token = tokens.emailVerification.create(user);
        const link = generateLink(token);
        console.log(link)
        const email = new VerificationEmail(user, link);
        email.sendMail().catch(console.log);
      } catch (error) {
        throw error
      }
  }

  async passwordReset (user) {
    try {
      const id = user.id;
      const token = await tokens.resetPassword.create(id);
      const email = new PasswordResetEmail(user, token);
      email.sendMail();
    } catch (error) {
      throw error
    }
  }

  changePassword (user) {
    try {
      const email = new ChangePasswordEmail(user);
      email.sendMail();
    } catch (error) {
      throw error
    }
  }

}

module.exports = { SendMailService }