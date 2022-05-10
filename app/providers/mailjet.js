const mailjet = require ('node-mailjet').connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);
const Host_Mail_Address = process.env.Host_Mail_Address;

async function mail(mailAddress, name, subject, message){
    try{
        const request = await mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[{
                "From": {
                    "Email": Host_Mail_Address,
                    "Name": "Longbotton"
                },
                "To": [{
                    "Email": mailAddress,
                    "Name":  name
                }],
                "Subject": subject,
                "HTMLPart": message
            }]
        })

    console.log(request);
    return request;

    }catch(error){
        throw err;
    }

}

module.exports = { mail };
