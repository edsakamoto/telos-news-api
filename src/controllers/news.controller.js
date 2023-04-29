const uuid = require('uuid');

const news = [
    {
        id: "ab35024b-cba2-4bcb-a8ea-f811d5ce37eb",
        title: "NodeJS",
        brief: "LoremIpsum",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        author_id: "1234",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
        publish_date: '2023-04-28',
        createdAt: new Date(),
        modifiedAt: new Date()
    }
];

const list = (request, response) =>{

    const {author_id} = request.query;

    if(author_id){
        const filteredByAuthor = news.filter((n) => n.author_id === author_id);
        if(filteredByAuthor.length === 0){
            return response.status(400).json({
                error: '@news/list',
                message: `We could not found any news with author_id ${author_id}`
            });
        };

        return response.json(filteredByAuthor);
    }

    return response.json(news);
}

const getById = (request,response) =>{
    const {id}  = request.params;

    const newss = news.find((n) => n.id === id);    

    if(!newss){
        return response.status(400).json({
            error: '@news/getById',
            message: `News not found ${id}`
        })
    }

    return response.json(newss);
}

const create = (request, response) =>{
    const {title, brief, content, image, publish_date} = request.body;

    const author_id = request.user.id; //o user vem do middleware
    console.log(author_id);
    const id = uuid.v4();      

    if(!publish_date){
        return response.status(400).json({
            error:'@news/create',
            message:`Publish date is required to register `
        })
    }

    const newss = {
        id
        ,title
        ,brief
        ,content
        ,author_id
        ,image
        ,publish_date
        ,createdAt: new Date()
        ,modifiedAt: new Date()
        
    };   

    news.push(newss);
   
    return response.status(201).json(newss);
}

const update = (request, response)=>{
    const {id}  = request.params;

    const {title, brief, content, image, publish_date } = request.body;    

    const newsIndex = news.findIndex((n) => n.id === id);

    if(newsIndex < 0){

        return response.json({
            error:'@news/update',
            message: `News not found ${id}`
        });
        
    }  

    const newsUpdated = {
        ...news[newsIndex]        
        ,title
        ,brief
        ,content
        ,image        
        ,publish_date          
        ,modifiedAt: new Date()      

    }

     news[newsIndex] = newsUpdated;

    return response.json(newsUpdated);
    
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