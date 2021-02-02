const  mongoose = require('../config/db')
var campgroundsschema=new mongoose.Schema({
  name:{
    type:String,
    required:true

  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now()
  },
  

})
//campgroundsschema.plugin(localstrategymongoose)
var userdata=mongoose.model('demos',campgroundsschema)

module.exports=userdata