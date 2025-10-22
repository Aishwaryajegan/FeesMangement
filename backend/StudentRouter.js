const express = require('express');
const router =express.Router();
const studentdata = require('./StudentModules');



router.post('/add',async(req,res)=>
{
    //const {name,password,phone,email,gender,language,country}=req.body;
try{
   const existingstudent =await studentdata.findOne({name : req.body.name});
    if(existingstudent){
       return res.send({"msg":"user already exists"}) 
    }
    const add_datas=
    {
         
        name:req.body.name,
        password:req.body.password,
         phone:req.body.phone,
        email:req.body.email,
        gender:req.body.gender,
        language:req.body.language,
        country:req.body.country
    }
 
    const datasave= new studentdata(add_datas);
     
    const result = await datasave.save();

    if(result)
    {
        res.send({"msg":"added"})
    }
    else{
        res.send({"msg":"unables to added"})
    }
}
catch(error){
    console.error("eerror");
    res.send({"msg":"error"})
}
})

router.post("/login", async(req,res)=>
{

    const{name,password}=req.body;
    console.log("Received:",name,password);
// if(name !== password) {
//    return res.send({"msg":"username and password must be same"})
// }
 
try{
const login =await studentdata . findOne({name:name,password:password});
if (login){
    return res.json({
        "msg":"login successfully",
        name:login.name
    })
    
}
else{
    return res.json({"msg":"unable to login"})
}
}catch(error)
{
    res.send({"msg":"server error"})
}
 
}) 


module.exports=router;