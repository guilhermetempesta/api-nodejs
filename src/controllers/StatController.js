const { StatRepository } = require('../../mongodb/stats/StatRepository');

class StatController {
  
  async index (req, res, next) {
    try {
      const statRepository = new StatRepository();
      const stats = await statRepository.get();
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = { StatController }