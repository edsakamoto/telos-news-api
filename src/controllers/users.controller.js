const users = [
    {
        id: 1,
        name: "john",
        biography: "random",
        email: "john@example.com",
        password: "1234",
        createdAt: Date.now,
        modifiedAt: null
    }
];

const list = (request, response) =>{
    return response.json(users);
}

const getById = (request,response) =>{
    const {id}  = request.params;

    const user = users.find((u) => u.id === Number(id));

    //response.end('informações sobre o usuário ' + id)

    if(!user){
        return response.status(400).json({
            error: '@users/getById',
            message: `User not found ${id}`
        })
    }

    return response.json(user);
}

const create = (request, response) =>{
    const {id, name, biography, email, password, createdAt, modifiedAt} = request.body;

    if(!user.find((f) =>f.email === email)){
        return response.status(400).json({
            error:'@users/create',
            message:`E-mail is already used ${email}`
        })
    }

    const user = {
        id: Number(id)
        ,name
        ,biography
        ,email
        ,password
        ,createdAt
        ,modifiedAt
    };
    //console.log(request.body)
    //response.end('criação de usuário');

    users.push(user);

    //console.log(user);
    return response.status(201).json(user);
}

const update = (request, response)=>{
    const {id}  = request.params;

    const {name, biography, email, password, createdAt, modifiedAt} = request.body;

    const userIndex = users.findIndex((u) => u.id === Number(id));

    if(userIndex < 0){

        return response.json({
            error:'@users/update',
            message: `User not found ${id}`
        });
        
    }

    const userUpdated = {
        id: Number(id)
        ,name
        ,biography
        ,email
        ,password
        ,createdAt
        ,modifiedAt        

    }

    users[userIndex] = userUpdated;

    return response.json(userUpdated);

    //response.end('indice do usuario ' + userIndex);
}

const remove = (request, response) =>{
    const {id} = request.params;

    const userIndex = users.findIndex((u) => u.id === Number(id));

    if(userIndex < 0){
        return response.json({
            
            error:'@users/remove',
            message: `User not found ${id}`
        });
    }


    users.splice(userIndex, 1);

    return response.send();
}

module.exports = {
    list
    ,getById
    ,create
    ,update
    ,remove
};