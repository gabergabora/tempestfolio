
async function paginate(model, entries, pageIndex, dataOptions={}){
    let collectionLength = await model.estimatedDocumentCount();
    let dataChunk = await model.find(dataOptions).limit(entries).skip(entries * (pageIndex - 1));

    let data = {
            count: parseInt(collectionLength),
            entries: parseInt(entries),
            page: parseInt(pageIndex),
            chunk: dataChunk,
        }

    return data;
}

module.exports = paginate;