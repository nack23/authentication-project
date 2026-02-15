let jwt=require("jsonwebtoken")
require("dotenv").config()
let auth = (req,res,next)=>{

 let token = req.cookies.token;

 if(!token){
  return res.send("Please Login First");
 }

 try{

  let dt = jwt.verify(token, process.env.SECRET);

  console.log("Decoded Token:", dt);   //  add this

  req.user = dt;   //  MUST BE HERE

  next();

 }catch(err){

  console.log("JWT ERROR:", err);

  return res.send("Invalid Token");

 }

}
module.exports=auth