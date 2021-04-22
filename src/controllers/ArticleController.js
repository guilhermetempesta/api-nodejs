const { ArticleRepository } = require('../repositories/ArticleRepository');
const articleController = new ArticleRepository;
const { NotFoundError } = require('../utils/errors');

class ArticleController {

    async store (req, res, next) {
        try {
            const article = req.body;
            await articleController.create(article);
            res.status(201).send();
        } catch (error) {
            next(error); 
        } 
    }

    async update (req, res, next) {        
        try {
            const article = req.body;
            article.id = req.params.id;
            await articleController.update(article);
            res.status(200).json({ message: "Informações atualizadas com sucesso." });
        } catch (error) {
            next(error); 
        } 
    }

    async index (req, res, next) {
        try {  
            const page = req.query.page || 1;                       
            const articles = await articleController.get(page); 
            res.status(200).json(articles);    
        } catch (error) {
            next(error); 
        }
    }   

    async show (req, res, next) {
        try {                        
            const id = req.params.id;
            const article = await articleController.getById(id); 
            if (!article) {
                throw new NotFoundError('Artigo não encontrado!');
            }
            res.status(200).json(article);    
        } catch (error) {
            next(error); 
        }
    }
    
    async destroy (req, res, next) {
        try {                        
            const id = req.params.id;   
            await articleController.remove(id);
            res.status(200).json({ message: "Artigo excluído com sucesso." });
        } catch (error) {
            next(error); 
        }
    }     
}

module.exports = { ArticleController }
