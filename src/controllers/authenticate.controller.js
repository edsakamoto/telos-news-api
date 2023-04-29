const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../config/env');

const {authorDatabase} = require('./authors.controller');

const {compareHash} = require('../utils/hashProvider');

const login = async(request,response) =>{
    const {email, password} = request.body;

    const author = authorDatabase.find(a => a.email === email);

    const loginErrorMessage ={
        error:'@authenticate/login',
        message:'Invalid user of password'
    }

    if(!author){
        return response.status(400).json(loginErrorMessage);
    }

    const isValidPassword = await compareHash(password, author.password);

    if(!isValidPassword){
        return response.status(400).json(loginErrorMessage);
    }

    const authorLogged = {... author }; //criando um outro objeto com inf. do author

    const token = jwt.sign(author, JWT_SECRET, {
        expiresIn: '1h'
    });    

    //delete author.password
    delete authorLogged.password;

    return response.json({...authorLogged,token});

};

module.exports = {
    login
};