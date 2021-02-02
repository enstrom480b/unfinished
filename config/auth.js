const { NetworkContext } = require("twilio/lib/rest/supersim/v1/network")

module.exports={

ensureAuthenticated:function(req,res){

    if(req.isAuthenticated())
    {
        return next()

    }
req.flash('error_msg','please log in')
res.redirect('/users/login')
}
}