const express = require("express");

const{PORT} = require('./config/env');

const newsRoutes = require('./routes/news.routes');
const authorsRoutes = require('./routes/authors.routes');
const authenticateRoutes = require('./routes/authenticate.routes');

const app = express();


app.use(express.json());

app.use(newsRoutes);
app.use(authorsRoutes);
app.use(authenticateRoutes);



//database in memory - api stateful - guarda as infos em memoria
// api stateless - n necessariamente precisa das infos em memoria






app.listen(PORT, () => {
    console.log(`API Running on port ${PORT}`);
});