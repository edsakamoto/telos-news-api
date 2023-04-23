const express = require("express");

const userRoutes = require('./routes/users.routes')

const app = express();

const PORT = 3333;



app.use(express.json());

app.use(userRoutes);

//database in memory - api stateful - guarda as infos em memoria
// api stateless - n necessariamente precisa das infos em memoria






app.listen(PORT, () => {
    console.log(`API Running on port ${PORT}`);
});