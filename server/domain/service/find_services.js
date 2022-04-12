const paginate = require('../api/paginate');
const ServiceModel = require('../../models/ServiceModel');

 async function findService(entries=null, pageIndex=null, filter={}){
    if(entries){
        entries;
        pageIndex = pageIndex || 1;

        let paginatedService = await paginate(ServiceModel, entries, pageIndex, filter);
        
        return paginatedService;
    }
    
    let services = await ServiceModel.find(filter);

    return services;
}

module.exports = findService;