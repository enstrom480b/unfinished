var mongoose=require('mongoose')
//connect to the DB
mongoose.connect('mongodb://localhost:27017/demso',{useNewUrlParser:true})
.then(()=>{console.log('connected')})
.catch((err)=>{console.log(err)})

 

module.exports=mongoose