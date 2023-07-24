
module.exports.getStudentInformation=async function(){
try{
var studntInfo ={
"name":"sunil",
"age":23,
"dipartment":"cse",
"address":"coimbatore"

}
return studntInfo;
}catch(err){
    console.log(err)


}

}
module.exports.getStudentMarks=async function(){

    try{
        var studentMark={
            "mark":"20"
        }
        return studentMark;
    }catch(err){
        console.log(err)
    
    }
}