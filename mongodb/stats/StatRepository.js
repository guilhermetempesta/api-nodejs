const { Stat } = require('./Stat');

class StatRepository {
  
  async create(data) {
    try {
      const stat = new Stat(data);
      await stat.save();
    } catch(error) {
      throw error;
    }
  }

  async get() {
    try {
      const defaultStat = {
        users: 0,
        categories: 0,
        articles: 0,
      }
      const stat = await Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } });  
      return stat || defaultStat;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      await Stat.deleteMany();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { StatRepository }