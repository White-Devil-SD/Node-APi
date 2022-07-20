const UsersModel = require('../models/users.model');
const Users = require('../models/users.model')
const Connection = require('../../config/db.config');


exports.getUserList = (req,res) => {

    Connection.query('SELECT * FROM user_details ORDER BY CURRENT_DATE_TIME', (err,result)=> {
        if(err){
            console.log('Error while fetching Users', err);
        }else{
            console.log('Users details fetched Successfully!');
            for(var i=0; i< result.length; i++){
            console.log(result[i].USERNAME + " "+ result[i].CONTACT_NUMBER +" " + result[i].PASSWORD + " " + result[i].CURRENT_DATE_TIME + " \n");
            }
        }
        res.send(result);
    })
}

exports.createNewUser = (req,res)=> {
    // console.log('req data',req.body);
    const userReqData = new Users(req.body)
    if(req.body.constructor === Object && Object.keys(req.body).length ===0 ){
        res.send(4000).send({success:false,statuscode: '204',message:"Please fill all details"});
    }else{
        UsersModel.createUser(userReqData, (err, data)=> {
            if(err){
                log
                res.send(err);
                res.json({status: true, statuscode: '201',message: 'Created', data2: data })
            }else{
                res.json({statuscode:'200',message:'User Creation Successful'})
            }
        })
    }
}

exports.deleteuser = (req,res)=> {
    Connection.query("DELETE FROM user_details ", (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log("User deletion Successful");
            res.json({status:true ,statuscode: '200', message:'Users were Successfully deleted'})
        }
    })
}

exports.getUser = (req,res) =>{
    Connection.query('SELECT * FROM user_details WHERE USER_ID=?', (err,result)=> {
        if(err){
            console.log('Error while fetching Users', err);
        }else{
            console.log('Users details fetched Successfully!');
            for(var i=0; i< result.length; i++){
            console.log(result[i].USERNAME + " "+ result[i].CONTACT_NUMBER +" " + result[i].PASSWORD + " " + result[i].CURRENT_DATE_TIME + " \n");
            }
        }
        res.send(result);
        res.json({statuscode:'200'})
    })
}


exports.getUserByID = (req,res)=> {
    UsersModel.getUserByID(req.params.id,(err,User)=> {
        if(err){
            res.send(err);
        }else{
            console.log('The details of the User are \n',User);
            res.send(User);
        }
    })
}