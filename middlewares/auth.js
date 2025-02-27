const jwt=require('jsonwebtoken')
 var {promisify} =require('util')
const { APIError } = require('../utilities/errors')

//authentication
async function auth(req, res, next) {
    if (!req.headers.authorization) {
       next( new APIError(401, 'you have not access , please login first' ))
    }

    try{
        var decoded = await promisify(jwt.verify)(req.headers.authorization,process.env.SECRET)
        req.id=decoded.id
    
        next()
    }catch(err){

      next( new APIError(401, 'you are not authenticated'))
    }
 
}

module.exports = auth