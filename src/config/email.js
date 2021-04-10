const nodemailer = require('nodemailer');
const {resolve} = require('path');
const { format, parseISO } = require('date-fns');
const fs = require('fs');
const handlebars = require('handlebars');
const useSSL = (process.env.EMAIL_PORT===465);

const emailConfigProduction = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    secure: useSSL,
    tls:{
        ciphers:'SSLv3'
    }     
};


const emailConfigTest = (testAccount) => ({
  host: 'smtp.ethereal.email',
  auth: testAccount,
});


async function createEmailConfig(){
  if (process.env.EMAIL_ENV === 'production') {
    return emailConfigProduction;
  } else {
    const testAccount = await nodemailer.createTestAccount();
    return emailConfigTest(testAccount);
  }
}


function emailTemplateParse(templatePath, variables){
  const template = fs.readFileSync(templatePath).toString("utf8");
  return handlebars.compile(template)(variables);  
}


class Email {
  async sendMail() {
    const config = await createEmailConfig();
    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(this);
  
    if (process.env.EMAIL_ENV !== 'production') {
      console.log('URL: ' + nodemailer.getTestMessageUrl(info));
    }
  }
}

class VerificationEmail extends Email {
  constructor(user, link) {
    super();
    const templatePath = resolve(__dirname,"..","views","email","verificationEmail.hbs");
    const variables = { user: user.firstName, link };

    this.from = `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`;
    this.to = user.email;
    this.subject = 'Verificação de e-mail';
    this.html = emailTemplateParse(templatePath, variables); 
    this.attachments = [{
      filename: 'logo_email.jpg',
      path: resolve(__dirname,'..','views','images','logo_email.jpg'),
      cid: 'logo'
    }]
  }
}

class PasswordResetEmail extends Email {
  constructor(user, token) {
    super();
    const templatePath = resolve(__dirname,"..","views","email","resetPassword.hbs");
    const variables = { user: user.firstName, token };

    this.from = `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`;
    this.to = user.email;
    this.subject = 'Redefinição de senha';
    this.html = emailTemplateParse(templatePath, variables); 
    this.attachments = [{
      filename: 'logo_email.jpg',
      path: resolve(__dirname,'..','views','images','logo_email.jpg'),
      cid: 'logo'
    }]
  }
}

class ChangePasswordEmail extends Email {
  constructor(user) {
    super();
    const templatePath = resolve(__dirname,"..","views","email","changePassword.hbs");
    const variables = { user: user.firstName };

    this.from = `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`;
    this.to = user.email;
    this.subject = 'Alteração de senha';
    this.html = emailTemplateParse(templatePath, variables); 
    this.attachments = [{
      filename: 'logo_email.jpg',
      path: resolve(__dirname,'..','views','images','logo_email.jpg'),
      cid: 'logo'
    }]
  }
}

module.exports = { 
  VerificationEmail,
  PasswordResetEmail,
  ChangePasswordEmail
};
