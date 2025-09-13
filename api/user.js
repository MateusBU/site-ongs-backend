const bcrypt = require('bcrypt-nodejs');

module.exports = app =>{

    const {sanitizeObject} = app.api.sanitize;

    const {existsOrError, notExistsOrError, equalsOrError, 
        notEqualsOrError, passwordContainsCharacOrError,
        isSmallerThanOrError, isEmailOrError
    } = app.api.validation;

    const encryptPassword = password =>{
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt); //crypted password
    }

    // Save a new user or update an existing one
    const save = async(req, res) =>{
        const user = sanitizeObject(req.body); //json on url
        if(req.params.id) user.id = req.params.id;

        //user is not registered as admin
        //TODO descomentar. Foi feito apenas para facilitar o desenv do site
        //  if(!req.originalUrl.startsWith('/users')) user.admin = false;
        // if(!req.user || !req.user.admin) user.admin = false; //to register an admin, must be other admin


        const maxLength = 100;
        try{
            // Verify if all required fields are provided and valid
            existsOrError(user.name, 'Name is required');
            isSmallerThanOrError(user.name, maxLength, `Name is too long. It must be smaller than ${maxLength}`);
            existsOrError(user.name, 'Name is required');

            existsOrError(user.email, 'Email is required');
            isEmailOrError(user.email, 'Email must be in a valid format, like user@example.com.');

            existsOrError(user.password, 'Password is required');
            passwordContainsCharacOrError(user.password, 'Invalid password format');
            existsOrError(user.confirmPassword, 'Password confirmation is required');
            equalsOrError(user.password, user.confirmPassword, 'Passwords do not match');

            const userFromDB = await app.db('users')
                .where({email: user.email})
                .first();

            // If this user already exists, prevent duplicate registration in the database
            if(!user.id){
                notExistsOrError(userFromDB, 'User already registered');
            }
        }
        catch(msg){
            return res.status(400).send(msg);
        }


        // Hash the user's password before saving
        user.password = encryptPassword(user.password);
        // Remove the password confirmation field — it's not stored in the database
        delete user.confirmPassword;

        // If the user already exists (based on ID), update their information
        // If successful, respond with status 204 (No Content); otherwise, return status 500 (Server Error)
        if(user.id){
            app.db('users')
                .update(user)
                .where({id: user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
        else{
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    //get all user of database
    const get = (req, res) =>{
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err));
    }

    //get user of database by his Id
    const getById = (req, res) =>{
        
        const user = {...req.body}; //json on url
        if(req.params.id) user.id = req.params.id

        console.log(user.id);
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({id: user.id})
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err, 'user not found'));
    }

    const remove = async(req, res) =>{
        try{
            const user = {...req.body};
            if(req.params.id) user.id = req.params.id

            const usersDeleted = await app.db('users')
                .where({id: user.id}).del()
            
            try{
                existsOrError(usersDeleted, 'User not found')
            }
            catch(msg){
                res.status(400).send(msg);
                return;
            }
            res.status(204).send()
        }
        catch(msg){
            res.status(500).send(msg);
        }
    }

    return {save, get, getById, remove};
}