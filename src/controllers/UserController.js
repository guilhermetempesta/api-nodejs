const { UserRepository } = require('../repositories/UserRepository');
const userRepository = new UserRepository;
const tokens = require('../utils/tokens');

class UserController {

    async store (req, res, next) {
        try {
            const user = req.body;
            await userRepository.create(user);
            res.status(201).json({ message: 'Inscrição realizada com sucesso!' });
        } catch (error) {
            next(error); 
        } 
    }

    async update (req, res, next) {        
        try {
            const user = req.body;
            user.id = req.user.id;
            await userRepository.update(user);
            res.status(200).json({ message: "Informações atualizadas." });
        } catch (error) {
            next(error); 
        } 
    }
    
    async show (req, res, next) {
        try {                        
            const id = req.user.id;
            const user = await userRepository.getById(id); 
            res.status(200).json(user);    
        } catch (error) {
            next(error); 
        }
    }

    async destroy (req, res, next) {
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
}

module.exports = { UserController }
