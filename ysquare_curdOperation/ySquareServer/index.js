const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload');
const database = require('mysql');

const {application, request,response}= require('express');
const add = express();
add.use(cors());
add.use(fileupload());
add.use(bodyparser.json());
add.use(express.json());
add.use(express.static('public'));


let a = database.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"Root",
        database:"ySquare"
    }
)

a.connect(function(error){
    if(error){
        console.log(error);
            }
            else{
                console.log("Database connected successfully");
            }
})

add.post("/registerStudentDetail",(request,response)=>{
  console.log(JSON.stringify(request.body));
  let {firstName,lastName,gender,dob,age,department,address,mailId,mobileNumber} = request.body;
  let sql ='insert into student(first_name,last_name,gender,date_of_birth, age,department,address,mail_id,mobile_number,status,created_by,created_on,modified_by,modified_on,  effective_from,effective_to) values(?,?,?,?,?,?,?,?,?,"A","admin",current_date(),"admin",current_timestamp,current_date(),"9999-02-20")'  
a.query(sql,[firstName,lastName,gender,dob,age,department,address,mailId,mobileNumber],(error,result)=>{
    if(error){
        let s ={"status":"error"};
        console.log(error);
        response.send(s);

    }else{
        let s= {"status":"success"};
        response.send(s);
    }
})
})


add.get('/getStudentDetail',(request,response)=>{
    a.query('select student_id ,first_name,last_name,gender,date_of_birth, age,department,address,mail_id,mobile_number from student where status="A"',
    (error,result)=>{
        if(error){
            console.log(error);
        }else{
            console.log(result);
            response.send(result);
        }
    }
    )
})

add.put('/update', (req, res) => {
    console.log('console data', req.body)
    const stdid = req.body.studentsID
    const firstname = req.body.firstName
    const lastname = req.body.lastName
    const age= req.body.age
    const address = req.body.city
    a.query(
      `update student set first_name='${firstname}',last_name='${lastname}',address='${address}',age='${age}' where id=${id}`,
      [firstname, lastname,age,city, stdid],
      (err, result) => {
          if (err) {
            console.log(err)
          } else {
            res.send(result)
          }
      }
    )
  })





add.delete('/deleteStudentDetails/:id?',(request,response)=>{
    let idToBeDeleted=request.params.id;
    
    if(idToBeDeleted){
        a.query('delete from student where status="A"',(error,result)=>{
            if(error){
                console.log(error)
            }else{
                console.log("deleted successfully")
            }

        })
    }

})










add.listen(6000,()=>{
    console.log("server running in 6000 port");
})