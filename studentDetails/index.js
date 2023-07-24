const express=require('express');               //connectivity from response
const cors =require('cors');                     //orgin    
const fileupload=require('express-fileupload')      //upload package
const bodyparser=require('body-parser');       //json format change package
const database=require('mysql');                //Db connection package
const {application,request,response} =require('express');
const add=express();
add.use(cors());
add.use(fileupload());
add.use(bodyparser.json());
add.use(express.json());
add.use(express.static('public'));          //for seting the api public  (must use)

let a= database.createConnection(
{
host:"localhost",
user:"root",
password:"Root",
database:"studentDetails"

}

)
a.connect(function(error){

    if(error){
        console.log(error);

    }
    else{
        console.log("DB connected!");
    }
})







add.post('/registerStudentInfo',(request,response)=>{
    console.log(JSON.stringify(request.body));          //to retrive the data in post  (request.body ) if get (request.params) ,JSON.stringify is used to  make the content of the object readable, if stringify is not used log means out  will be object-object
    let {firstName, lastName, age, dob, mailId, phoneNumber, loginPassword}=request.body;       
    let sql='insert into studentInfo(firstName, lastName, age, dob, mailId, phoneNumber, loginPassword, status, effectiveFrom, effectiveTo, createdBy, createdOn) values(?,?,?,?,?,?,?, "A", current_date(), "9999-02-20", "admin", current_timestamp)'
    a.query(sql,[firstName, lastName, age, dob, mailId, phoneNumber, loginPassword],(error,result)=>{
        if(error){
            let s={"status":"error"};
            console.log(error);
            response.send(s);
           

        }
        else{
            let s={"status":"success"};
            response.send(s);
        }
    })
})









add.get('/studentDetails',(request,response)=>{
    a.query('select studentId,firstName,lastName,dob,age,mailId,phoneNumber,status from studentInfo where status="A" and effectiveTo>= current_date()',
    (error,result)=>{
        if(error){

            console.log(error);
        }
        else{
            console.log(result);
            response.send(result);
        }


    })
})


``






add.get('/studentDetails/:id?',(requset,response)=>{            //id is given here  because of getting a particular id by giving   in top localhost in postman
    console.log(requset.params);
    let studentId = requset.params.id;
    if(studentId) {
        let sql = "select studentId,firstName,lastName,age,dob,mailId,phoneNumber,loginpassword,status from studentInfo where status='A' and effectiveTo >= current_date() and studentId = ?";
        a.query(sql,[studentId], (error,result)=>{
            if(error){
                console.log(error);
                response.send(error)
            }
            else{
                console.log(result);
                
                response.send(result);
            }

        }
        )
    } else {
        a.query("select studentId,firstName,lastName,age,dob,mailId,phoneNumber,loginpassword,status from studentInfo where status='A' and effectiveTo >= current_date()",
        (error,result)=>{
            if(error){
                console.log(error);
                response.send(error)
            }
            else{
                console.log(result);
                response.send(result);
            }
        }
        )
    }
    
})





add.post('/registerCourseInfo',(request,response)=>{
    console.log(JSON.stringify(request.body));          //to retrive the data in post  (request.body ) if get (request.params) ,JSON.stringify is used to  make the content of the object readable, if stringify is not used log means out  will be object-object
    let {courseName,courseCode,courseDuration}=request.body;       
    let sql='insert into courseInfo(courseName,courseCode,courseDuration,status, effectiveFrom, effectiveTo, createdBy, createdOn) values(?,?,?,"A", current_date(), "9999-02-20", "admin", current_timestamp)'
    a.query(sql,[courseName,courseCode,courseDuration],(error,result)=>{
        if(error){
            let s={"status":"error"};
            console.log(error);
            response.send(s);
          

        }
        else{
            let s={"status":"success"};
            response.send(s);
        }
    })
})













add.listen(8000,()=>                    //8000 is user defined port number
{
    console.log("server running in 8000 port");
}
)
