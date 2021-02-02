
var path=require('path')
var helmet=require('helmet')
var methodoverride=require('method-override')
var passport=require('passport')
var Localstrategy=require('passport-local');
var localstrategymongoose =require('passport-local-mongoose')
var bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const request=require('request')
var ejs=require('ejs')
const flash=require('connect-flash')
const session=require('express-session')
/*
router.use(cookieParser())
router.use(methodoverride('_method'))
router.use(express.static('public'))
router.use(express.static(__dirname + '/public'));
router.use(express.json())

router.set('view engine','ejs')
router.set('views',path.join(__dirname,'views'))
*/

const express=require('express')
const expresslayouts=require('express-ejs-layouts')
const app=express()
app.use(flash())
app.use(session({
    secret: 'ronser',
    resave: true,
    saveUninitialized: true
  }))
app.use(passport.initialize())
app.use(passport.session())
app.use((req,res,next)=>{

    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg=req.flash('error_msg')
    next()
})

require('./config/passport')(passport)

const db=require('./config/db')
const schema=require('./config/schema')
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',require('./index'))
app.use('/users',require('./users'))
app.use(expresslayouts)
app.set('view engine','ejs')
const port =process.env.PORT || 5000
app.listen(port,console.log(`server started on port,${port}`))