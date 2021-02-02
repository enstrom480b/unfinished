const express=require('express')
const router=express.Router()
const userdata=require('./config/schema')
const passport=require('passport')
const session=require('express-session')
const bcrypt = require('bcryptjs')



router.get('/login',function(req,res){

    res.render('login')
})



router.get('/register',function(req,res){

    res.render('register')
})



router.post('/register',(req,res)=>{
const {name,email,password,password2}=req.body
let errors=[];

if(!name||!email||!password||!password2)
{
    errors.push({msg:'please fill in all fields'})
}

if(password.length<6)
{
    errors.push({msg:'password should be at least six characters'})
}
if(errors.length>0)
{
    res.render('register',{
errors,
name,
email,
password,
password2
    })
}
else{
    userdata.findOne({email:email})
    .then(user=>{
        if(user){
            errors.push({msg:'email is already registered'})
            res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        const newuser=new userdata({name,email,password})
    
        bcrypt.genSalt(10,(err,salt)=>{
bcrypt.hash(newuser.password,salt,(err,hash)=>{
if(err)throw err;
newuser.password=hash
newuser.save()
.then((user)=>{
req.flash('success_msg','you are now registered')
 res.redirect('/users/login')
})
.catch((err)=>console.log(err))
})
        
        })

    }
    

})
}
})
router.post('/login',function(req,res,next){
passport.authenticate('local',{
successRedirect:'/dashboard',
failureRedirect:'/users/login',
failureFlash:true
})(req,res,next)
  
})


router.get('/logout',function(req,res){
    req.logOut()
    req.flash('success_msg','you are logged out')
    res.redirect('/login')
})

module.exports=router