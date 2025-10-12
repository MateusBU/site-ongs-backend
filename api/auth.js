const {authSecret} = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app =>{

    const {sanitizeObject} = app.api.sanitize;

    const signin = async(req, res) =>{
        const body = sanitizeObject(req.body);
        
        if(!body.email || !body.password){
            return res.status(400).send("Inform user and password");
        }

        const user = await app.db('users')
            .where({email: req.body.email})
            .first();

        if(!user){
            return res.status(400).send('User not found');
        }

        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if(!isMatch){
            return res.status(401).send('Email/password may be wrong');
        }

        const now = Math.floor(Date.now() / 1000);

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, //issued at
            exp: now + (60 * 60 * 24 * 10) //valid login is for 
        };

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        });
    }

    const validateToken = async(req, res) =>{
        const userData = req.body || null;
        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret);

                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true);
                }
            }
        }
        catch(e){
            res.send(false);
        }
        res.send(false);
    }

    return{signin, validateToken};
}