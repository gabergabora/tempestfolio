const paginate = require('../api/paginate');

 async function findResources(model, entries=null, pageIndex=null){
    if(entries){
        entries;
        pageIndex = pageIndex || 1;

        let paginatedResource = await paginate(model, entries, pageIndex);
        
        return paginatedResource;
    }
    
    let resource = await model.find();

    return resource;
}

module.exports = findResources;