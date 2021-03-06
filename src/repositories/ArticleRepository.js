const Article = require('../models/Article');
const { Sequelize } = require('sequelize');
const { NotFoundError } = require('../utils/errors');

class ArticleRepository {

    async create(data) {
        try {   
            const category = await Article.create(data);   
            return category;     
        } catch(err) {
            throw err
        }
    }

    async update(data) {
        try {
            await Article.update(data,{   
                    where: {id: data.id}
                }
            );
        } catch(err) {
            throw err
        }
    }

    async get(page) {
        try {
            const limit = 10; // limite usado para paginacao 

            const { count, rows } = await Article.findAndCountAll({
                attributes: ['id', 'name', 'description'],
                include: [{
                    association: 'category',
                    attributes: ['id', 'name']
                }, {
                    association: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }],
                order: ['id'],
                limit: limit,                // limite por pagina  
                offset: page * limit - limit // deslocamento
            })
            return { data: rows, count, limit}  
        } catch (err) {
            throw err
        }
    }

    async getById(id) {
        try {
            const category = await Article.findOne({ 
                attributes: ['id', 'name', 'description', 'imageUrl', 'content'],
                include: [{
                    association: 'category',
                    attributes: ['id', 'name']
                }, {
                    association: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }],
                where: {id: id}
            })
            category.content = category.content.toString();

            return category;
        } catch (err) {
            throw err
        }
    }

    async getByCategory(id, page) {
        try {
            const limit = 10; // limite usado para paginacao            
            const { count, rows } = await Article.findAndCountAll({ 
                attributes: [
                    'id', 'name', 'description', 'imageUrl',                    
                    [Sequelize.fn('concat',
                        Sequelize.col('user.first_name'),
                        ' ',
                        Sequelize.col('user.last_name')
                        ), 'author']
                ],
                include: [{
                    association: 'user',
                    attributes: []
                }],                
                where: {categoryId: id},
                order: [
                    ['id', 'DESC'],
                ],
                limit: limit,                // limite por pagina  
                offset: page * limit - limit // deslocamento                 
            })
            return { data: rows, count, limit}  
        } catch (err) {
            throw err
        }
    }

    async count() {
        try {
            const articleCount = await Article.count();
            return articleCount;
        } catch (err) {
            throw err
        }
    }

    async remove(id) {
        try {            
            const rowsDeleted = await Article.destroy({
                where: {id: id} 
            });
            if (rowsDeleted===0) throw new NotFoundError('Artigo n??o encontrado!'); 
        } catch (err) {
            throw err
        }
    }
}

module.exports = { ArticleRepository }