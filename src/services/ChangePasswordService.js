const tokens = require('../utils/tokens') ;
const { UserRepository } = require('../repositories/UserRepository');
const { SendMailService } = require('./SendMailService');
const { InvalidArgumentError } = require('../utils/errors');

class ChangePasswordService {

    async execute (token, newPassword, confirmPassword) {
        try {
            if ((!token) || (token.trim()==="")){
                throw new InvalidArgumentError ('Token não informado!'); 
            }
            if ((typeof token !== "string") || (token.lenght===0)) {
                throw new InvalidArgumentError ('Token inválido!'); 
            }
            if ((!newPassword) || (newPassword.trim()==='')) { 
                throw new InvalidArgumentError ('Nova senha não informada!'); 
            }
            if (!confirmPassword) { 
                throw new InvalidArgumentError ('Confirme a nova senha!'); 
            }
            if (newPassword !== confirmPassword) { 
                throw new InvalidArgumentError ('Confirmação da nova senha não confere!'); 
            }

            const id = await tokens.resetPassword.check(token);

            const userRepository = new UserRepository();
            await userRepository.changePassword(id, newPassword);

            await tokens.resetPassword.invalidate(token);
            const user = await userRepository.getById(id);

            const sendMail = new SendMailService;
            sendMail.changePassword(user);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { ChangePasswordService }