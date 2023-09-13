const jwt=require('jsonwebtoken')
 var {promisify} =require('util')
//authentication
async function auth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'you are not have access , please login first' })
    }

    //verify token 
  //   jwt.verify(req.headers.authorization,process.env.SECRET,function(err,decoded){
// })
    try{

        var decoded = await promisify(jwt.verify)(req.headers.authorization,process.env.SECRET)
        // console.log(decoded.id);
        req.id=decoded.id
    
    }catch(err){

       return res.status(401).json({message:'you are not authenticated'})
    }
 
    next()
}

module.exports = auth