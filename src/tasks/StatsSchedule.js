const schedule = require('node-schedule');
const { UserRepository } = require('../repositories/UserRepository');
const userRepository = new UserRepository ();
const { Stat } = require('../../mongodb/stats/Stat');

module.exports = app => {

  schedule.scheduleJob('*/1 * * * *', 
    async () => {
      try {

        const usersCount = await userRepository.count();
        const categoriesCount = 0;
        const articlesCount = 0;
  
        const lastStat = await Stat.findOne({}, {}, 
          { sort: { 'createdAt' : -1 } })
  
        const stat = new Stat({
          users: usersCount,
          categories: categoriesCount,
          articles: articlesCount,
          createdAt: new Date()
        });
  
        const changeUsers = !lastStat || stat.users !== lastStat.users;
        const changeCategories = !lastStat || stat.categories !== lastStat.categories;
        const changeArticles = !lastStat || stat.articles !== lastStat.articles;
  
        if (changeUsers || changeCategories || changeArticles) {
          stat.delete();
          stat.save().then(() => console.log('[Stats] Estatísticas atualizadas!'))
        }
      } catch (error) {
        throw error;
      }    
    }
  )

}