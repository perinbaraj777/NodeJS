const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const bodyparser = require('body-parser')
const database = require('mysql')
const {application,request,response}=require('express')
const add = express();
add.use(cors());
add.use(fileupload());
add.use(bodyparser.json());
add.use(express.json());
add.use(express.static('public'));

let a =database.createConnection({
    host:"localhost",
    user:"root",
    password:"Root",
    database:"studentDetails"

})

a.connect(function(error){
    if (error){
        console.log(error);
    }
    else{
        console.log("DB connected")
    }
}
)


add.post('/registerStudentInfo',(request,response)=>{
    console.log(JSON.stringify(request.body))
    let{firstName,lastName, age, dob, mailId, phoneNumber, loginPassword}=request.body;
    let sql='insert into studentInfo(firstName, lastName, age, dob, mailId, phoneNumber, loginPassword, status, effectiveFrom, effectiveTo, createdBy, createdOn) values(?,?,?,?,?,?,?, "A", current_date(), "9999-02-20", "admin", current_timestamp)'
    a.query(sql,[firstName,lastName,age,dob,mailId,phoneNumber,loginPassword],(error,result)=>{
        if(error){
            let s={"status ":"error"};
            console.log(error)
            response.send(s)
        }
        else{
            let s={"status":"success"}
            response.send(s)
        }
    })
}
)

add.listen(7000,()=>{
    console.log("server running in 7000 port")
})