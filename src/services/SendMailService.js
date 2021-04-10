const tokens = require('../utils/tokens');    
const { VerificationEmail } = require('../config/email');

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

}

module.exports = { SendMailService }