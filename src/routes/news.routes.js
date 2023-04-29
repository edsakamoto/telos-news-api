const {Router} = require('express');

const newsController = require('../controllers/news.controller');

const {verifyAuthenticate} = require('../middlewares/verifyAuthentication');

const routes = Router();



routes.get('/news',newsController.list);

routes.post('/news',verifyAuthenticate,newsController.create);

routes.get('/news/:id',newsController.getById);

routes.put('/news/:id',verifyAuthenticate,newsController.update);

routes.delete('/news/:id',verifyAuthenticate,newsController.remove);

module.exports = routes;