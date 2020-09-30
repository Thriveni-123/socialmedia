const userService = require('../service/userService');
const constants = require('../constants');

var globalRes;

module.exports.Login =  async (req,res) => {
    globalRes = res;
    try {
        await userService.Login(req.body,loginResponse);
    }catch(error){
        console.log('Something went wrong: Controller : Login',error); 
    }
}
function loginResponse(err, result,type) {
    let response = {...constants.defaultServerResponse};
    try {
            if(err){
                response.message = err.message;
            }else {
                const responseFromService =  result;
                if(type==1){
                    response.status = 200;
                    response.message = constants.USERMESSAGE.LOGIN;
                    response.body = responseFromService;
                }
                else{
                    response.status = 201;
                    response.message = constants.USERMESSAGE.INCORRECT;
                    response.body = responseFromService;
                }
            }
     }catch(error){
        console.log('Something went wrong: Controller :loginResponse',error);
        response.message = error.message; 
     }
     return globalRes.status(response.status).send(response);
  }


  module.exports.Addpost =  async (req,res) => {
    globalRes = res;
    try {
        await userService.Addpost(req,AddpostResponse);
    }catch(error){
        console.log('Something went wrong: Controller : Addpost',error); 
    }
}
function AddpostResponse(err, result,type) {
    let response = {...constants.defaultServerResponse};
    try {
            if(err){
                response.message = err.message;
            }else {
                const responseFromService =  result;
                    response.status = 200;
                    response.message = constants.USERMESSAGE.ADD;
                    response.body = responseFromService;
            }
     }catch(error){
        console.log('Something went wrong: Controller :AddpostResponse',error);
        response.message = error.message; 
     }
     return globalRes.status(response.status).send(response);
  }

  module.exports.Updatepost =  async (req,res) => {
    globalRes = res;
    try {
        await userService.Updatepost(req,UpdatepostResponse);
    }catch(error){
        console.log('Something went wrong: Controller : Updatepost',error); 
    }
}
function UpdatepostResponse(err, result,type) {
    let response = {...constants.defaultServerResponse};
    try {
            if(err){
                response.message = err.message;
            }else {
                const responseFromService =  result;
                    response.status = 200;
                    response.message = constants.USERMESSAGE.UPDATE;
                    response.body = responseFromService;
                
            }
     }catch(error){
        console.log('Something went wrong: Controller :UpdatepostResponse',error);
        response.message = error.message; 
     }
     return globalRes.status(response.status).send(response);
  }


  module.exports.Deletepost =  async (req,res) => {
    globalRes = res;
    try {
        await userService.Deletepost(req.body,DeleteResponse);
    }catch(error){
        console.log('Something went wrong: Controller : Deletepost',error); 
    }
}
function DeleteResponse(err, result,type) {
    let response = {...constants.defaultServerResponse};
    try {
            if(err){
                response.message = err.message;
            }else {
                const responseFromService =  result;
                    response.status = 200;
                    response.message = constants.USERMESSAGE.DELETE;
                    response.body = responseFromService;
            }
     }catch(error){
        console.log('Something went wrong: Controller :DeleteResponse',error);
        response.message = error.message; 
     }
     return globalRes.status(response.status).send(response);
  }