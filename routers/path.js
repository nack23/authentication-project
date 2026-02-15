let express=require("express")
let {home, registrationpage, loginpage, registerdt, logindt, dashboard, logoutdata}=require("../controllers/functiondata")
let path=express.Router();
let auth=require("../middleware/auth")

path.route("/").get(home);
path.route("/register").get(registrationpage);
path.route("/login").get(loginpage);
path.route("/register-data").post(registerdt)
path.route("/login").post(logindt)
path.get("/dashboard", auth, dashboard);
path.route("/logout").get(logoutdata);


module.exports=path