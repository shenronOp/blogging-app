require("dotenv").config();

const mongoose=require('mongoose');
const {main}=require('./connection');
const {validateToken}=require('./services/authentication');
const cookieParser=require('cookie-parser');
const {checkForAuthenticationCookie}=require('./middlewares/authentication');
const Blog=require('./models/blog');
const path=require('path');

main(process.env.MONGO_URL);

const express=require('express');
const app=express();
const PORT=process.env.PORT || 8000;
const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');

app.use(express.static(path.resolve('./public')))
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));


app.listen(PORT, ()=>{console.log(`SERVER STARTED AT PORT ${PORT}`)});

app.get("/", async (req, res)=>{
    
    const allBlogs=await Blog.find({});
    return res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
})


