const {Router}=require('express');
const User=require('../models/user');
const Blog=require('../models/blog');
const Comment=require('../models/comment');
const multer=require('multer');
const router=Router();
const fs=require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath=`./public/uploads/${req.user._id}`;
    fs.mkdirSync(folderPath, {recursive: true});
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

router.get("/add_new", (req, res)=>{
    res.render("addBlog", {
        user:req.user
    });
})

router.post("/", upload.single('coverImage'), async (req, res)=>{
    const {title, body}=req.body;
    if(!title || !body || !req.file)return res.redirect('/blog/add_new');
    
    const blog=await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL: `/uploads/${req.user._id}/${req.file.filename}`,
    })
    console.log(blog);
    console.log(req.body);
    console.log(req.file);
    return res.redirect(`/`)
})

router.post('/comment/:blogId', async (req, res)=>{
  const comment=await Comment.create({
    content: req.body.content,
    blogId:req.params.blogId,
    createdBy:req.user._id,
  })
  console.log(comment);

  return res.redirect(`/blog/${req.params.blogId}`)
})

router.get("/:id", async (req, res)=>{
    const comments=await Comment.find({blogId: req.params.id}).populate('createdBy');
    const blog=await Blog.findById(req.params.id).populate("createdBy");
    console.log(blog);
    return res.render("blog", {
        blog,
        user:req.user,
        comments,
    })
})
module.exports=router;