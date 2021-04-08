const bcrypt = require('bcrypt-nodejs')
const tokens = require('../utils/tokens');
const { UserRepository } = require('../repositories/UserRepository');
const userRepository = new UserRepository;
// const { SendMailService } = require('../services/SendMailService')
// const sendMail = new SendMailService;
const { InvalidArgumentError, InvalidCredentialsError, NotFoundError } = require('../utils/errors');

class PasswordService {

    check (password, encryptPassword) {
        const matched = bcrypt.compareSync(password, encryptPassword)
        if (!matched) {
            throw new InvalidCredentialsError;
        }
    }

    // async change (token, newPassword, confirmPassword) {
    //     try {     
    //         if ((!token) || (token.trim()==="")){
    //             throw new InvalidArgumentError ('Token não informado!'); 
    //         }
    //         if ((typeof token !== "string") || (token.lenght===0)) {
    //             throw new InvalidArgumentError ('Token inválido!'); 
    //         }
    //         if ((!newPassword) || (newPassword.trim()==='')) { 
    //             throw new InvalidArgumentError ('Nova senha não informada!'); 
    //         }
    //         if (!confirmPassword) { 
    //             throw new InvalidArgumentError ('Confirme a nova senha!'); 
    //         }
    //         if (newPassword !== confirmPassword) { 
    //             throw new InvalidArgumentError ('Confirmação da nova senha não confere!'); 
    //         }
    //         const id = await tokens.resetPassword.check(token);
    //         await userRepository.updatePassword(id, newPassword);
    //         await tokens.resetPassword.invalidate(token);
    //         const user = await userRepository.getById(id);
    //         // sendMail.changePassword(user);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async reset (email) {
    //     try {
    //         if (!email) {
    //             throw new InvalidArgumentError ('Informe seu e-mail!');
    //         }
    //         const user = await userRepository.getByEmail(email);
    //         if (!user) return // por segurança, não informar que o usuário não existe
    //         await sendMail.passwordReset(user);
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

module.exports = { PasswordService }