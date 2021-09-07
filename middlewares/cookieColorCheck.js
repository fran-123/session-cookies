module.exports= (req,res,next) =>{
    if(req.cookies.userColor){
        req.session.userColor = req.cookies.userColor
    }
    next()
}