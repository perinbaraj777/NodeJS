
    //Synchronous or blocking method-  the first program outputs and next or when first program executes and  only next prints

// const fs = require("fs");    //require is a keyword used to importing the fs(filesystem)package

// const data=fs.readFileSync("./package.json","utf-8");     //readfilesync is a method in the fs package
//                                    //utf8 is to  make the content 

// console.log(data);
// moreWork();

// function moreWork(){
// console.log("morework");

// }







         //ASYNCHRONOUS METHOD small code runs ands outputs 

//const fs = require("fs");    //require is a keyword used to importing the fs(filesystem) default package iside node module

//const data=fs.readFileSync("./package.json","utf-8"); //readfilesync is a method in the fs package
                                //utf8 is to  make the content 

//console.log(data);

// fs.readFile('./package.json','utf-8',(err,data)=>{
//     if(err==null){
//         console.log(data)
//     }
// })
// moreWork();

// function moreWork(){
// console.log("morework function called");
// }







const fs =require("fs");
const studentInfo=require('./studentInformation.js');
var x =studentInfo.getStudentInformation();
var studentMark=require('./studentInformation.js');
var y =studentMark.getStudentMarks();
console.log(x);
console.log(y);
    







// const fs =require("fs");
// function morework(){
// fs.writeFileSync('StudentInfo.txt',"hiii iam");
// fs.appendFileSync('StudentInfo.txt',"surya");
// }
// morework();