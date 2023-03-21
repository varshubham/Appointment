const jwt = require('jsonwebtoken');

const SECRETKEY = "thisisasecretkey";

const fetchuser = async (req,res,next)=>{
    const authtoken = req.header('auth-token');
    if(!authtoken)
    {
        res.status(401).send({error:"You are not authorized"});
    }
    try {
        const data = jwt.verify(authtoken,SECRETKEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(400).send("Internal Server error");
    }

}

module.exports = fetchuser