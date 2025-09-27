const {Router}=require('express');
const User=require('../models/user');

const router=Router();

router.get('/signin', (req, res)=>{
    return res.render("signin");
});

router.get('/signup', (req, res)=>{
    return res.render("signup");
});

router.post("/signup", async (req, res)=>{
    const {fullName, email, password}=req.body;
    const newuser=await User.create({
        fullName:fullName,
        email:email,
        password:password,
    })
    console.log(newuser);
    return res.redirect("/");
})

router.post("/signin", async (req, res)=>{
    try{
        const {email, password}=req.body;
        const token=await User.matchPassword(email, password);
        console.log(token);
        if(token)return res.cookie('token', token).redirect("/");
        else return res.redirect("/user/signin");
    }
    catch(err){
        res.render("signin", {
            error: 'INVALID USER AND PASSWORD'
        })
    }
    
})

router.get("/logout", (req, res)=>{
    res.clearCookie("token").redirect("/user/signin");
})

module.exports=router;