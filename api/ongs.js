
module.exports = app =>{

    const {sanitizeObject} = app.api.sanitize;

    const {existsOrError, notExistsOrError, equalsOrError, 
        notEqualsOrError, isSmallerThanOrError
    } = app.api.validation;


    const save = async(req, res) =>{
    
        const ong = sanitizeObject(req.body); //
        if(req.params.id) ong.id = req.params.id;

        try{
            existsOrError(ong.name, 'Name is required');
            existsOrError(ong.description, 'Description is required');
            existsOrError(ong.userId, 'User is required');

            const userFromDB = await app.db('users') //db is a way to access knex
                .where({id: ong.userId}).first();
            existsOrError(userFromDB, 'User does not exist');
        }
        catch(msg){
           return res.status(400).send(msg);
        }

        if(ong.id){
            app.db('ongs')
                .update(ong)
                .where({id: article.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
        else{
            app.db('ongs')
                .insert(ong)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    const remove = async(req, res) =>{
        try{
            const ong = {...req.body};
            if(req.params.id) ong.id = req.params.id

            const ongsDeleted = await app.db('ongs')
                .where({id: ong.id}).del()
            
            try{
                existsOrError(ongsDeleted, 'Ong not found')
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

    const getById = (req, res) =>{
        const ong = {...req.body};
        if(req.params.id) ong.id = req.params.id

        app.db('ongs')
            .where({id: ong.id})
            .first()
            .then(ongRes => res.json(ongRes))
            .catch(err => res.status(500).send(err));
    }

    return{save, remove, getById};
};
