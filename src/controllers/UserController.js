const tokens = require('../utils/tokens') ;
const { UserRepository } = require('../repositories/UserRepository');
const { SendMailService } = require('../services/SendMailService');
const { ResetPasswordService } = require('../services/ResetPasswordService');
const { ChangePasswordService } = require('../services/ChangePasswordService');
const userRepository = new UserRepository;

class UserController {

    async store (req, res, next) {
        try {
            const user = req.body;
            const newUser = await userRepository.create(user);

            const sendMail = new SendMailService;
            sendMail.verification(newUser);

            res.status(201).json({ 
                message: 'Usuário cadastrado com sucesso! O e-mail deve ser confirmado.' 
            });
        } catch (error) {
            next(error); 
        } 
    }

    async update (req, res, next) {        
        try {
            const user = {
                id: req.params.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role
            };
            await userRepository.update(user);
            res.status(200).json({ message: "Usuário atualizado com sucesso." });
        } catch (error) {
            next(error); 
        } 
    }

    async index (req, res, next) {
        try {                        
            const users = await userRepository.get(); 
            res.status(200).json(users);    
        } catch (error) {
            next(error); 
        }
    }

    async show (req, res, next) {
        try {      
            console.log(req.params.id)                   
            const id = req.params.id;
            const user = await userRepository.getById(id); 
            res.status(200).json(user);    
        } catch (error) {
            next(error); 
        }
    }
    
    async destroy (req, res, next) {
        try {                        
            const id = req.params.id;   
            await userRepository.remove(id);
            res.status(200).json({ message: "Usuário excluído com sucesso." });
        } catch (error) {
            next(error); 
        }
    } 

    async updateSelf (req, res, next) {        
        try {          
            const user = {
                id: req.user.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            };
            await userRepository.update(user);
            res.status(200).json({ message: "Informações atualizadas." });
        } catch (error) {
            next(error); 
        } 
    }
    
    async showSelf (req, res, next) {
        try {                        
            const id = req.user.id;
            const user = await userRepository.getById(id); 
            res.status(200).json(user);    
        } catch (error) {
            next(error); 
        }
    }
    
    async destroySelf (req, res, next) {
        try {                        
            const id = req.user.id;   
            await userRepository.remove(id);
            res.status(200).json({ message: "Sua conta foi excluída." });
        } catch (error) {
            next(error); 
        }
    }  

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

    async verificationEmail (req, res, next) {
        try {
            const user = req.user;
            await userRepository.verificationEmail(user.id);
            res.status(200).json({ 
                message: "E-mail verificado com sucesso!" 
            });
        } catch (error) {
            next(error) 
        }
    }

    async resetPassword (req, res, next) {
        try {
            const resetPassword = new ResetPasswordService();
            await resetPassword.execute(req.body.email);
            res.status(200).json({ 
                message: 'As instruções para redefinição de senha foram enviadas para seu e-mail.' 
            });
        } catch (error) {
            next(error);
        }
    }

    async changePassword (req, res, next) {
        try {   
            const { token, password, confirmPassword } = req.body;
            
            const changePassword = new ChangePasswordService();
            await changePassword.execute(token, password, confirmPassword);

            res.status(200).json({ 
                message: "Sua senha foi alterada com sucesso!" 
            });             
        } catch (error) {
            next(error) 
        }
    }
}

module.exports = { UserController }
