const Category = require('../models/Category');
const Article = require('../models/Article');
const { MethodNotAllowedError, NotFoundError } = require('../utils/errors');

class CategoryRepository {

    async create(data) {
        try {   
            const category = await Category.create(data);   
            return category;     
        } catch(err) {
            throw err
        }
    }

    async update(data) {
        try {
            await Category.update(data,{   
                    where: {id: data.id}
                }
            );
        } catch(err) {
            throw err
        }
    }

    async get() {
        try {
            const categories = await Category.findAll({
                attributes: ['id', 'name', 'parentId'],
                order: ['id']
            })
            const categoriesWithPath = withPath(categories)
            return categoriesWithPath
        } catch (err) {
            throw err
        }
    }

    async getById(id) {
        try {
            const category = await Category.findOne({ 
                attributes: ['id', 'name'],
                include: [{
                    association: 'parent',
                    attributes: ['id', 'name']
                }],
                where: {id: id} 
            })
            return category;
        } catch (err) {
            throw err
        }
    }

    async getTree() {
        try {
            const categories = await Category.findAll({
                attributes: ['id', 'name', 'parentId'],
                order: ['id']
            })
            console.log(categories)
            const categoriesTree = toTree(categories)
            console.log(categoriesTree)

            return categoriesTree
        } catch (err) {
            throw err
        }
    }

    async count() {
        try {
            const categoryCount = await Category.count();
            return categoryCount;
        } catch (err) {
            throw err
        }
    }

    async remove(id) {
        try {
            
            const subcategory = await Category.count({
                where: { parentId: id }
            });
            console.log(subcategory)
            if (subcategory) throw new MethodNotAllowedError('Esta categoria possui subcategorias.');

            const articles = await Article.count({
                where: { categoryId: id }
            })
            if (articles) throw new MethodNotAllowedError('Esta categoria possui artigos.');

            const rowsDeleted = await Category.destroy({
                where: {id: id} 
            });
            if (rowsDeleted===0) throw new NotFoundError('Categoria não encontrada!'); 
        } catch (err) {
            throw err
        }
    }
}

module.exports = { CategoryRepository }

function withPath (categories) {
    const getParent = (categories, parentId) => {
        const parent = categories.filter(parent => parent.id === parentId)
        return parent.length ? parent[0] : null
    }
    const categoriesWithPath = categories.map(category => {
        let path = category.name
        let parent = getParent(categories, category.parentId)

        while(parent) {
            path = `${parent.name} > ${path}`
            parent = getParent(categories, parent.parentId)
        }

        category.dataValues.path = path
        return { ...category.dataValues }
    })

    categoriesWithPath.sort((a, b) => {
        if(a.path < b.path) return -1
        if(a.path > b.path) return 1
        return 0
    })

    return categoriesWithPath
}

function toTree (categories, tree) {
    if (!tree) tree = categories.filter(c => !c.parentId)
    tree = tree.map(parentNode => {
        const isChild = node => node.parentId == parentNode.id
        parentNode.children = toTree(categories, categories.filter(isChild))
        return parentNode
    })
    return tree
}