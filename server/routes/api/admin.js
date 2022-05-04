//Service
const AdminModel = require('../../auth/models/AdminModel');

function Route(router){
   router.get('/getadminuser', async (req, res, next)=>{
       try {
          let adminUser = await AdminModel.findOne({}, "_id username email mailVerified created");

          res.status(200).json({data: adminUser});
       }
       catch (error){
           next(error);
       }
   })
}

module.exports = Route;
