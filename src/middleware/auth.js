const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const protect =(req,res,next)=>{
  try{
    let token
    if(req.headers.authorization){
        token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.SECRETE_KEY_JWT);
        req.payload = decoded
        next()
    }else{
        res.json({
            message : "Server butuh token"
        })
    }
  }catch(error){
    console.log(error);
    if(error && error.name ==='JsonWebTokenError'){
      next(new createError(400,'Token tidak valid'))
    }else if(error && error.name ==='TokenExpiredError'){
      next(new createError(400,'Token kadaluwarsa'))
    }else{
      next(new createError(400,'Token tidak aktif'))
    }
  }
};

module.exports = {protect}