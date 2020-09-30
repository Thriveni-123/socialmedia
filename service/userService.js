const constants = require('../constants');
var Database = require("../database/database");
var nodemailer = require('nodemailer');

module.exports.Login =  async ({email,password},callback) => {
    try {
        await Database.connectionPool.getConnection(async function(err, connection){ 
             connection.changeUser({
                 database : Database.databaseName
             }, function(err) {
                 if (err) {
                     console.log("Database is not selected");
                     callback(new Error(err),null,null);
                 }else { //if database is selected
                    //////////////////////////////
                    // STEP=1 :check whether the user is already register 
                     var UserSignIn = "SELECT * FROM user WHERE email='"+email+"'";
                     //console.log(selectAssociates);
                     connection.query(UserSignIn, async function (err, result, fields) {
                         if (err){
                             console.log("Query  is not executed");
                             callback(new Error(err),null,null);
                         }else {
                             if(result.length==0) { //if no results send the responce 
                                callback(null,{},1); 
                             }else { //if results is there                                    
                                     Object.keys(result).forEach(async function(key) {
                                         var dbPassword = result[key].password;
                                         if(dbPassword==password){    //check whether the password and confirm password is same 
                                                 Object.keys(result).forEach(async function(key) {
                                                 var row = result[key];  
                                                 callback(null,row,1);
                                                 });
                                         }else{
                                                 callback(null,{},2);//type=3 means password not match
                                         }    
                                     });
                                 }
                             }
                         });//SREP=1 end
                        //////////////////////////  
                 } // end of if database is selected
             });//end of changeUser
             connection.release();//release the connection
         });    // end of getConnection              
 }catch(error){
     console.log('Something went wrong: Service: Login',error);
     callback(new Error(error),null,null);
 }

}


module.exports.Addpost =  async(req,callback) => { 
    try {
        var posts=req.posts
        console.log(posts);
         await Database.connectionPool.getConnection(async function(err, connection){ 
            connection.changeUser({
                database : Database.databaseName
            }, function(err) {
                if (err) {
                // console.log(err);
                    console.log("Database is not selected");
                    callback(new Error(err),null,null);
                // throw err
                }
                else { 
                    var timestamp = Number(new Date());
                    var file = req.files.file.name;
                    filename = timestamp+"-"+file.name;
                    file.mv("./upload/image"+filename,function(err){
                    var filepath="image/"+filename;
                  var addpost = "INSERT INTO user (posts,photos)VALUES('"+posts+"','"+filepath+"')";
                  connection.query(addpost, async function (err, result, fields) {
                      if (err){
                        console.log("Query  is not executed");
                        callback(new Error(err),null,null);
                      }
                      else {
                        Object.keys(result).forEach(async function(key) {
                           var course= result[key];
                           callback(null, course,1);  
                        });
                         
                      }
                  });
                  });
                } // end of if database is selected//////////////////////
            });//end of changeUser
            connection.release();//release the connection
        }); // end of getConnection
          
}catch(error){
    console.log('Something went wrong: Service: Addpost',error);
    //throw new Error(error);
    callback(new Error(error),null,null);
}
}

module.exports.Updatepost =  async (req,callback) => {
    try {
        var posts=req.posts
         await Database.connectionPool.getConnection(async function(err, connection){ 
            connection.changeUser({
                database : Database.databaseName
            }, function(err) {
                if (err) {
                // console.log(err);
                    console.log("Database is not selected");
                    callback(new Error(err),null,null);
                // throw err
                }
                else {
                    var timestamp = Number(new Date());
                    var file = req.files.filename;
                    filename = timestamp+"-"+file.name;
                    file.mv("./upload"+filename,function(err){
                    var filepath="upload/"+filename;
                  var coursecreate = "UPDATE  USER SET ( posts='"+posts+"' AND photos='"+filepath+"')";
                  connection.query(coursecreate, async function (err, result, fields) {
                      if (err){
                          console.log("Query  is not executed");
                          callback(new Error(err),null,null);
                      }
                      else {
                        Object.keys(result).forEach(async function(key) {
                           var update= result[key]; 
                           callback(null, update,1);  
                        }); 
                      }
                  });
                });
                } // end of if database is selected//////////////////////
            });//end of changeUser
            connection.release();//release the connection
        }); // end of getConnection
          
}catch(error){
    console.log('Something went wrong: Service: courseCreate',error);
    //throw new Error(error);
    callback(new Error(error),null,null);
}
}


module.exports.Deletepost =  async ({},callback) => {
    try {
         await Database.connectionPool.getConnection(async function(err, connection){ 
              connection.changeUser({
                  database : Database.databaseName
              }, function(err) {
                  if (err) {
                      console.log("Database is not selected");
                      callback(new Error(err),null,null);
                  }else {//if database is selected
                      var deletepost = "UPDATE user SET  flag=1 WHERE email='"+email+"'";
                      connection.query(deletepost, async function (err, result, fields) { //query
                          if (err){
                          console.log("Query  is not executed");
                          callback(new Error(err),null,null);
                          }else {
                              Object.keys(result).forEach(async function(key) {//query
                                var delpost = result[key]; 
                                callback(null,delpost,1);
                              });
                          }
                      });
                  } // end of if database is selected
              });//end of changeUser
              connection.release();//release the connection
          }); // end of getConnection
            
  }catch(error){
      console.log('Something went wrong: Service: Deletepost',error);
      callback(new Error(error),null,null);
  }
}
