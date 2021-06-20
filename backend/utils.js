import jwt from "jsonwebtoken"

export const generateToken = (user) =>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET || 'somethingsecret', {
        expiresIn: '30d',
    });
}

// Middleware
export const isAuth = (req,res,next) =>{
    const authorization = req.headers.authorization;
    if(authorization){
        // check header for token
        const token = authorization.slice(7,authorization.length);  // Bearer XXXXXX
        // use jwt to decrypt the token (verify given token using a secret or a public key to get a decoded token token)
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err,decode) => {
            //Callback to get the decoded token,
            // decode get the result (data in jwt.sign) in verify()
            if(err){
                //replace with proper error handling, otherwise client will wait until time out
                res.status(401).send({message: 'Invalid Token'});
            }else{
                req.user = decode;
                next();
            }
        });
    }else{
        res.status(404).send({message: 'Not authorized'});
    }
}

export const isAdmin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send({message: 'Invalid Admin Token'});
    }
}