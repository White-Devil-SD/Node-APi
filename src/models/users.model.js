const Connection = require('../../config/db.config');
const { DATETIME } = require('mysql/lib/protocol/constants/types');
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);




var Users =function(user){
    this.USER_ID = user.USER_ID;
    this.USERNAME = user.USERNAME;
    this.CONTACT_NUMBER = user.CONTACT_NUMBER;
    this.PASSWORD = user.PASSWORD;
    this.CREATE_DATE_TIME = DATETIME;
}


Users.createUser = (userReqData,results)=>{
    console.log(userReqData);
    var USER_ID = userReqData.USER_ID;
    var USERNAME = userReqData.USERNAME;
    var CONTACT_NUMBER = userReqData.CONTACT_NUMBER;
    var PASSWORD = userReqData.PASSWORD;
    let encryptedData = cipher.update(PASSWORD, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    var sql=
    " INSERT INTO user_details VALUES (" + USER_ID + ",'" + USERNAME + "'," + CONTACT_NUMBER + ",'" + encryptedData + "', '" +  new Date() + "')";
    Connection.query(sql, userReqData,(err,res)=> {
        console.log(sql);
        if(err){
            console.log('insertion error');
            console.log(sql);
            results(null, err);
        }else{
            console.log('inserion successful');
            results(null, res);
        }
    })
}


// Users.getAllUsers= (result=>{
//     Connection.query('SELECT * FROM user_details',(err,res)=> {
//         if(err){
//             result(null,err);
//         }else{
//             let encryptedData = cipher.update(PASSWORD, "utf-8", "hex");
//             encryptedData += cipher.final("hex");
//             let decryptedData = decipher.update(PASSWORD, "hex", "utf-8");
//             decryptedData += decipher.final("utf8");
//             console.log("Decrypted message: " + decryptedData);

//             PASSWORD = decryptedData; 
//             // result(null,res);
//         }
//     })
// })


Users.getUserByID = (id,result) =>{
    Connection.query('SELECT * FROM user_details WHERE USER_ID=?',id,(err,res)=>{
        if(err){
            console.log('Fetch err');
            result(null,err)
        }else{
            result(null,res);
        }
    })
}

module.exports = Users;