const ServiceModel = require('../../models/service');

 async function findService(entries=null, pageIndex=null){

    if(entries){
        entries;
        pageIndex = pageIndex || 1;

        // Find mongo by entries
    }

    let services = await ServiceModel.find();

    return services;
}

module.exports = findService;