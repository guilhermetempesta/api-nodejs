const schedule = require('node-schedule');
const { UserRepository } = require('../repositories/UserRepository');
const { CategoryRepository } = require('../repositories/CategoryRepository');
const { ArticleRepository } = require('../repositories/ArticleRepository');
const { StatRepository } = require('../../mongodb/stats/StatRepository');
const userRepository = new UserRepository ();
const categoryRepository = new CategoryRepository ();
const articleRepository = new ArticleRepository ();
const statRepository = new StatRepository ();

module.exports = app => {

  schedule.scheduleJob('*/1 * * * *',
    async () => {
      try {
        if (process.env.NODE_ENV="development") return
        
        const usersCount = await userRepository.count();
        const categoriesCount = await categoryRepository.count();
        const articlesCount = await articleRepository.count();

        const stat = {
          users: usersCount,
          categories: categoriesCount,
          articles: articlesCount,
          createdAt: new Date()
        }
  
        const lastStat = await statRepository.get();
  
        const changeUsers = !lastStat || stat.users !== lastStat.users;
        const changeCategories = !lastStat || stat.categories !== lastStat.categories;
        const changeArticles = !lastStat || stat.articles !== lastStat.articles;

        if (changeUsers || changeCategories || changeArticles) {
          await statRepository.deleteAll();
          await statRepository.create(stat);
          console.log('[Stats] Estatísticas atualizadas!');          
        }
      } catch (error) {
        throw error;
      }    
    }
  )

}