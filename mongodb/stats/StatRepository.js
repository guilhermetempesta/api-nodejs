const { Stat } = require('./Stat');

class StatRepository {
  
  async get () {
    const defaultStat = {
      users: 0,
      categories: 0,
      articles: 0,
    }
    const stat = await Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } });  
    return stat || defaultStat;
  }
}

module.exports = { StatRepository }