//middleware functions   

//without middleware: new request => run route handler
//with middleware     new request => do something => run router handler
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT);
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token })
        console.log(decoded)

        if (!user) {
            throw new Error()
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "please authenticate" })
    }
}

module.exports = auth;