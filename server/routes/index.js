const holoController = require('../controllers').holos;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: '/api home',
  }));

  app.get('/api/items', holoController.list);
  app.post('/api/items', holoController.new);

  app.post('/api/search', holoController.search);
  app.delete('/api/items/:id', holoController.remove);
};