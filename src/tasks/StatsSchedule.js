const schedule = require('node-schedule');
const { UserRepository } = require('../repositories/UserRepository');
const { StatRepository } = require('../../mongodb/stats/StatRepository');
const userRepository = new UserRepository ();
const statRepository = new StatRepository ();

module.exports = app => {

  schedule.scheduleJob('*/1 * * * *', 
    async () => {
      try {

        const usersCount = await userRepository.count();
        const categoriesCount = 0;
        const articlesCount = 0;

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