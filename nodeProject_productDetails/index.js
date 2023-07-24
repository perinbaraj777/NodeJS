const express = require('express')
const cors = require('cors')
const  bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const database = require('mysql');
const nodeMailer  = require('nodemailer')
const {application,request,response} = require('express');
const add = express();
add.use(cors());
add.use(bodyParser.json());
add.use(fileUpload());
add.use(express.json());
add.use(express.static('public'));

let a = database.createConnection(
    {
    host:'localhost',
    user:'root',
    password:'Root',
    database:'nodeProductDetails'
})

a.connect(function(error){
if(error){
    console.log(error);
}else{
    console.log("DB connected")
}
})

add.post('/addProducts',(request,response)=>{
    console.log(JSON.stringify(request.body));
    let{productName,category,distributor,price,rating} = request.body;
    let sql = 'insert into grossarydetails(product_name,category,distributor,price,rating,status,effectiveFrom,effectiveTo,createdBy,createdOn) values(?,?,?,?,?,"A",current_date(),"9999-02-01","admin",current_timestamp)'
    a.query(sql,[productName,category,distributor,price,rating],(error,result)=>{
        if(error){

            let s={"status":"failed"};
            console.log(error);
            response.send(s);
        }
        else{
            let s={"status":"success"};
            response.send(s);
        }
    })
})



add.get('/getProducts',(request,response)=>{
    a.query('select product_name,category,distributor,price,rating from grossarydetails where category ="fruit"',(error,result)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(result);
            response.send(result);
        }
    })
})



add.listen(2000,()=>{
    console.log("server running in 2000 port")
})

var transporter = nodeMailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user:'sivasekar7737@gmail.com',
        pass:'fxxyiheilxgsmeml'
    }
});

var mailOptions ={
from:'sivasekar7737@gmail.com',
to:'perinbaraj777@gmail.com',
subject:'checking the nodemailer in nodejs',
text:'hello appa how are you'

};
transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error);
    }
    else{
        console.log('E mail sent' + info.response);
    }
});

