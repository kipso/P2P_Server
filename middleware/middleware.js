module.exports = {
    //Send Response to the end user
    sendResponse: function(req,res,next){
        // valid response then send to user. else pass it to error handler
        if(res.locals.message){
            res.send({
                "message":res.locals.message,
                "role":res.locals.role
            });
        } else {
            next();
        }
    }
}