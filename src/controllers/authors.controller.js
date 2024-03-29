const uuid = require('uuid');

const {generateHash} = require('../utils/hashProvider');

const authors = [
    {
        id: "fb35024b-cba2-4bcb-a8ea-f811d5ce37eb",
        name: "john",
        biography: "Doees",
        email: "john@example.com",
        password: "$2a$08$bK8KGkf.cRKuInp7DrmRH.T/bbLBjpnqrhyQIYp99csukt1LgMVYy",
        createdAt: new Date(),
        modifiedAt: new Date()
    }
];

const list = (request, response) =>{
    return response.json(authors);
};

const getById = (request,response) =>{

    const {id} = request.params;

    const author = authors.find((a) => a.id === id);


    //filter -> filtra elementos de um array
    //map    -> retorna um novo array personalizado
    //reduce -> agrega valores de um array
    //every  -> retorna true ou false
    //some   -> retorna true ou false

    if(!author){
        return response.status(400).json({
            error:"@authors/getById",
            message:`Author not found ${id}`
        });
    }

    return response.json(author);

};

const create = async (request,response) =>{

    const {name, biography, email, password} = request.body;

    const id = uuid.v4();

    const createdAt = new Date();

    const modifiedAt = new Date();

    const hashedPassoword = await generateHash(password);

    if(authors.find((a) =>a.email === email)){
        return response.status(400).json({
            error:'@authors/create',
            message:`E-mail [${email}] is already in use `
        })
    }

    const author = {
        id
        ,name
        ,biography
        ,email
        ,password: hashedPassoword
        ,createdAt
        ,modifiedAt
    }

    authors.push(author);

    return response.status(201).json(author)

};

const update = async (request,response) =>{
    const {id} = request.params;

    const {name, biography, email, password } = request.body;

   // const modifiedAt = new Date();

    const authorIndex = authors.findIndex((a) => a.id === id);
    
    if(authorIndex < 0){
        return response.status(400).json({
            error:'@authors/update',
            message:`Author not found ${id}`
        });
    }
    const authorUpdated = {
        ...authors[authorIndex]
        ,name
        ,biography
        ,email        
        ,modifiedAt: new Date()
    }

    if(password){
        authorUpdated.password = await generateHash(password);
    } else {
        authorUpdated.password = authors[authorIndex].password;
    }

    authors[authorIndex] = authorUpdated;

    return response.json(authorUpdated);
};

const remove = (request,response) =>{

    const {id} = request.params;

    const authorIndex = authors.findIndex((m) => m.id === id);

    if(authorIndex < 0 ){
        return response.status(400).json({
            error:'@authors/remove',
            message: `Author not found ${id}`
        });
    }

    authors.splice(authorIndex,1);

    return response.send();

};

module.exports = {
    list,
    getById,
    create,
    update,
    remove,
    authorDatabase: authors,

}