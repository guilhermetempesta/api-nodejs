const { UserRepository } = require('../repositories/UserRepository');
const { SendMailService } = require('../services/SendMailService');
const { InvalidArgumentError } = require('../utils/errors');

class ResetPasswordService {

    async execute (email) {
        try {
            if (!email) {throw new InvalidArgumentError ('Informe seu e-mail!')}

            const userRepository = new UserRepository;
            const user = await userRepository.getByEmail(email);
            if (!user) return // por segurança, não informar que o usuário não existe

            const sendMail = new SendMailService;
            await sendMail.passwordReset(user);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { ResetPasswordService }