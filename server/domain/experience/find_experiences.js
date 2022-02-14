const paginate = require('../api/paginate');
const ExperienceModel = require('../../models/ExperienceModel');

 async function findExperiences(entries=null, pageIndex=null){
    if(entries){
        entries;
        pageIndex = pageIndex || 1;

        let paginatedService = await paginate(ExperienceModel, entries, pageIndex);
        
        return paginatedService;
    }
    
    let experiences = await ExperienceModel.find();

    return experiences;
}

module.exports = findExperiences;