let express=require("express");
let jwt=require("jsonwebtoken");
let bcrypt=require("bcrypt");
const cookieParser = require("cookie-parser");

let allroutes=require("./routers/path")
let dbconnection=require("./database/db");

require("dotenv").config()
let PORT=process.env.PORT

let app=express();
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs"); //Express bolega →"Jab bhi res.render() aayega → EJS file use karo"
app.set("views", "./views");  //EJS files kaha rakhi hai → views folder me

app.use("/",allroutes)





let start=async ()=>{
    try {
        await dbconnection();
        app.listen(PORT,(req,res)=>{
            console.log("port running on this",PORT)
        })
        
    } catch (error) {
        console.log(error)
    }
}
start();

