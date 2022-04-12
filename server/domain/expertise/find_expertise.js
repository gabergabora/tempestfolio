const ExpertiseModel = require('../../models/ExpertiseModel');


async function findExpertise(entries, pageIndex){
   const paginate = require('../api/paginate');
   console.log(pageIndex);

   if(entries){
      entries;
      pageIndex = pageIndex || 1;

      let paginatedService = await paginate(ExpertiseModel, entries, pageIndex);
      
      return paginatedService;
   }

   let expertise = await ExpertiseModel.find({}, "");

   expertise = expertise.map(skill=>{
      delete skill._doc.icon.file_id
      return skill;
   })

   return expertise;
}


module.exports = findExpertise