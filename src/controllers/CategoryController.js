const { CategoryRepository } = require('../repositories/CategoryRepository');
const categoryRepository = new CategoryRepository;
const { NotFoundError } = require('../utils/errors');

class CategoryController {

    async store (req, res, next) {
        try {
            const category = {
                name: req.body.name,
                parentId: req.body.parentId
            };
            await categoryRepository.create(category);
            res.status(201).send();
        } catch (error) {
            next(error); 
        } 
    }

    async update (req, res, next) {        
        try {
            const category = {
                name: req.body.name,
                parentId: req.body.parentId
            };
            category.id = req.params.id;
            await categoryRepository.update(category);
            res.status(200).json({ message: "Informações atualizadas com sucesso." });
        } catch (error) {
            next(error); 
        } 
    }

    async index (req, res, next) {
        try {                        
            const categories = await categoryRepository.get(); 
            res.status(200).json(categories);    
        } catch (error) {
            next(error); 
        }
    }   

    async show (req, res, next) {
        try {                        
            const id = req.params.id;
            const category = await categoryRepository.getById(id); 
            if (!category) {
                throw new NotFoundError('Categoria não encontrada!');
            }
            res.status(200).json(category);    
        } catch (error) {
            next(error); 
        }
    }
    
    async destroy (req, res, next) {
        try {                        
            const id = req.params.id;   
            await categoryRepository.remove(id);
            res.status(200).json({ message: "Categoria excluída com sucesso." });
        } catch (error) {
            next(error); 
        }
    }     
}

module.exports = { CategoryController }
