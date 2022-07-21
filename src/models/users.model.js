const Connection = require('../../config/db.config');
const { DATETIME } = require('mysql/lib/protocol/constants/types');
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

var Users =function(user){
    this.USER_ID = user.USER_ID;
    this.USERNAME = user.USERNAME;
    this.CONTACT_NUMBER = user.CONTACT_NUMBER;
    this.PASSWORD = user.PASSWORD;
    this.CREATE_DATE_TIME = DATETIME;
}

Users.iv = iv;
Users.key= key;

function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
 }


Users.createUser = (userReqData,results)=>{
    console.log(userReqData);
    var USER_ID = userReqData.USER_ID;
    var USERNAME = userReqData.USERNAME;
    var CONTACT_NUMBER = userReqData.CONTACT_NUMBER;
    var PASSWORD = userReqData.PASSWORD;
    var d = encrypt(PASSWORD);
    var sql=
    " INSERT INTO user_details VALUES (" + USER_ID + ",'" + USERNAME + "'," + CONTACT_NUMBER + ",'" + d.encryptedData + "', '" +  new Date() + "')";

    Connection.query(sql, userReqData,(err,res)=> {
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