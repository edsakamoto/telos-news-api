const {Router} = require('express');

const routes = Router();

const newsController = require('../controllers/news.controller');

routes.get('/news',newsController.list);

routes.post('/news',newsController.create);

routes.get('/news/:id',newsController.getById);

routes.put('/news/:id',newsController.update);

routes.delete('/news/:id',newsController.remove);

module.exports = routes;