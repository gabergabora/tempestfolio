class Requester{
    serverRequestObject;
    reqParams;
    reqQuery;
    reqBody;
    reqFile;

    constructor(reqObject)
    {
      this.serverRequestObject = reqObject;
      this.reqParams = reqObject.params;
      this.reqQuery = reqObject.query;
      this.reqBody = reqObject.body;
      this.reqFile = reqObject.file || null;

      return this;
    }

}


module.exports = Requester;