const uuid = require('uuid');

// const today = new Date();


const news = [
    {
        id: "fb35024b-cba2-4bcb-a8ea-f811d5ce37eb",
        name: "john",
        biography: "Doees",
        email: "john@example.com",
        password: "1234",
        createdAt: new Date(),
        modifiedAt: new Date()
    }
];

const list = (request, response) =>{
    return response.json(news);
}

const getById = (request,response) =>{
    const {id}  = request.params;

    const newss = news.find((n) => n.id === id);

    //response.end('informações sobre o usuário ' + id)

    if(!newss){
        return response.status(400).json({
            error: '@news/getById',
            message: `News not found ${id}`
        })
    }

    return response.json(newss);
}

const create = (request, response) =>{
    const {name, biography, email, password} = request.body;

    const id = uuid.v4();

    const createdAt = new Date();

    const modifiedAt = new Date();

    if(news.find((n) =>n.email === email)){
        return response.status(400).json({
            error:'@news/create',
            message:`E-mail [${email}] is already in use `
        })
    }

    const newss = {
        id
        ,name
        ,biography
        ,email
        ,password
        ,createdAt
        ,modifiedAt
        
    };
    //console.log(request.body)
    //response.end('criação de usuário');

    news.push(newss);

    //console.log(user);
    return response.status(201).json(newss);
}

const update = (request, response)=>{
    const {id}  = request.params;

    const {name, biography, email, password } = request.body;

    const modifiedAt = new Date();

    const newsIndex = news.findIndex((n) => n.id === id);

    if(newsIndex < 0){

        return response.json({
            error:'@news/update',
            message: `News not found ${id}`
        });
        
    }

    const newsUpdated = {
        ...news[newsIndex]        
        ,name
        ,biography
        ,email
        ,password        
        ,modifiedAt        

    }

     news[newsIndex] = newsUpdated;

    return response.json(newsUpdated);

    //response.end('indice do usuario ' + userIndex);
}

const remove = (request, response) =>{
    const {id} = request.params;

    const newsIndex = news.findIndex((n) => n.id === id);

    if(newsIndex < 0){
        return response.json({
            
            error:'@news/remove',
            message: `News not found ${id}`
        });
    }


    news.splice(newsIndex, 1);

    return response.send();
}

module.exports = {
    list
    ,getById
    ,create
    ,update
    ,remove
};