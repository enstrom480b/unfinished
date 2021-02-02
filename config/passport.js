const localstrategy=require('passport-local').Strategy
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const user=require('../config/schema')


module.exports=function(passport){
    passport.use(new localstrategy({
usernameField:'email'},(email,password,done)=>{
    user.findOne({email:email})
    .then((user)=>{
if(!user){
    return done(null,false,{message:'that email isnt registered'})
}
else{
    bcrypt.compare(password,user.password,(err,ismatch)=>{

if(err)throw err;

if(ismatch){
    return done(null,err)
}
else{
    return done(null,false,{message:'password incorect'})
}
    })
}

    })
    .catch((err)=>{console.log(err)})
}))
passport.serializeUser((user,done)=>{ done(null,user.id)})
passport.deserializeUser(function(id,done){user.findById(id,function(err,user){done(err,user)})})
}
//,
//


