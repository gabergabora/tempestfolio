const MessageModel = require('../../models/MessageModel');

async function findMessages(entries, pageIndex, filter={}){
   const acceptableFilterVerbs = ["read"];
   const constructedFilter = {};

   if(Object.keys(filter).length){
      //filter is specified;

     //Since we will be accepting only read filter atm we will force accept read
      const read = filter.read;

      if((typeof read === "boolean") || (read === "true" || read === "false") ){
        constructedFilter.read = read;
      }
   }


  

   if(entries){
      entries;
      pageIndex = pageIndex || 1;
      

      let collectionLength = await MessageModel.estimatedDocumentCount();
      let dataChunk = await MessageModel.find(constructedFilter).sort({date: -1}).limit(entries).skip(entries * (pageIndex - 1));

      let data = {
            count: parseInt(collectionLength),
            entries: parseInt(entries),
            page: parseInt(pageIndex),
            chunk: dataChunk,
      }

      return data;

   }
   
   let messages = await MessageModel.find(constructedFilter).sort({date: -1});
   return messages;


}


module.exports = findMessages