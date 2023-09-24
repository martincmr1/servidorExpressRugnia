const { Router } = require("express");

const passport = require("passport");
//const { authToken, generateToken } = require("../utils/jwt.util");
//const Users = require("../Dao/models/users.model");
//const { comparePassword } = require("../utils/password");

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    try {
      res.status(201).json({ status: "success", payload: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }
);

router.get("/failregister", (req, res) => {
  res.json({ status: "error", error: "Fail register" });
});

router.get("/faillogin", (req, res) => {
  res.json({ status: "error", error: "Fail login" });
});

/*
router.post('/login',async(req,res) =>{
 try {
  const {email,password}=req.body
const user =await Users.findOne({email})

if(!user)
return res.status(400).json({status:'error',error:'invalid credentials'})

if (!comparePassword(password,user.password)){
  return res.status(400).json({status:'error',error:'invalid credentials'})
}
req.user ={
  email:email,
  role:'user'
}

const token = generateToken(user._id)

res.json({ status: "success", payload: "Nueva sesión iniciada",token });

 } catch (error) {
  console.log(error);
      res.status(500).json({ status: "error", error: "internal server error" });
 }
})


*/
















router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    try {
      if (!req.user)
      
        return res
          .status(400)
          .json({ status: "error", error: "invalid credentials" });
      req.session.user = {
        email: req.user.email,
        role: "user",
      };

      res.json({ status: "success", payload: "Nueva sesión iniciada" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", error: "internal server error" });
    }
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/profile");
  }
);

/*
router.get('/token',authToken,(req,res)=>{
  

  res.json({message:req.user})
})






router.post('/token',async(req,res)=>{
  const user ={
    name:'martin',
    lastname:'rugnia',   

  }
  const token=generateToken(user)

  res.json({status:'success',message:'loged in',token})
})
*/


module.exports = router;
