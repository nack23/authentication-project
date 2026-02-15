let path=require("path")
let registerdbtable=require("../model/schema")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken");
require("dotenv").config();


let home=(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/home.html"))
}

let registrationpage=(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/register.html"))
}

let loginpage=(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/login.html"))
}

let registerdt=async (req,res)=>{
    try {
        let {name,email,phone,password}=req.body;
        let hashpassword=await bcrypt.hash(password,10)
        let dataobj={
        name,
        email,
        phone,
        password:hashpassword
        }
        let exist = await registerdbtable.findOne({ email });
        if(exist){
            return res.send("Email Already Registered please try with different email");
        }
        let savedata=await registerdbtable.create(dataobj)
        res.sendFile(path.join(__dirname,"../public/successfully.html"))
      // res.send("done",savedata)
        
    } catch (error) {
        console.log(error)
    }

}


let logindt = async (req,res)=>{

 let {email,password} = req.body;

 let user = await registerdbtable.findOne({ email });

 if(!user){
  return res.send("User Not Found");
 }

 let match = await bcrypt.compare(password, user.password);

 if(match){
    let token=jwt.sign({email},process.env.SECRET)

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict" });

    res.redirect("/dashboard");
    //res.send("done")

 }else{
  res.sendFile(path.join(__dirname,"../public/wrong.html"));
 }

}

let dashboard = async(req,res)=>{
    //res.send("welcome"+" "+req.user.email);
   // res.sendFile(path.join(__dirname,"../public/dashbord.html"))
   let useremail=req.user.email  //from login data
   let dbdata= await registerdbtable.findOne({ email: useremail })
   res.render("dashboard",{email: dbdata.email,
     username: dbdata.name,
     hashpassword:dbdata.password})
}

let logoutdata=(req,res)=>{
    res.clearCookie("token")
    res.redirect("/")
}

module.exports={home, registrationpage,loginpage,registerdt,logindt,dashboard,logoutdata}