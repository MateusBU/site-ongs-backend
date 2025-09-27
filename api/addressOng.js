module.exports = app =>{

    const {sanitizeObject} = app.api.sanitize;

    const {existsOrError} = app.api.validation;


    const save = async (req, res) =>{
        const address = sanitizeObject(req.body);
        if(req.params.id) address.id = req.params.id;


        const maxLength = 100;
        try{
            // Verify if all required fields are provided and valid
            existsOrError(address.state, 'State is required');
            existsOrError(address.city, 'City is required');

            existsOrError(address.neighborhood, 'Neighborhood is required');
            
            existsOrError(address.street, 'Street is required');
            existsOrError(address.number, 'Number is required');
            existsOrError(address.ongId, 'Ong is required');


            const ongFromDB = await app.db('ongs') //db is a way to access knex
                .where({id: address.ongId}).first();
            existsOrError(ongFromDB, 'Ong does not exist');
            
        }
        catch(msg){
            return res.status(400).send(msg);
        }

        if(address.id){
            app.db('addressOng')
                .update(address)
                .where({id: address.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
        else{
            app.db('addressOng')
                .insert(address)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    const remove = async(req, res) =>{
        try{
            const address = {...req.body};
            if(req.params.id) address.id = req.params.id

            const addressDeleted = await app.db('addressOng')
                .where({id: address.id}).del()
            
            try{
                existsOrError(addressDeleted, 'Address not found')
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
        const address = {...req.body};
        if(req.params.id) address.id = req.params.id

        app.db('addressOng')
            .where({id: address.id})
            .first()
            .then(addRes => res.json(addRes))
            .catch(err => res.status(500).send(err));
    }


    const getAddressesByOng = (req, res) =>{
        const ongId = req.params.id;

        app.db('addressOng')
            .where({ongId: ongId})
            .then(addressRes => res.json(addressRes))
            .catch(err => res.status(500).send(err));
    }

    return{save, remove, getById, getAddressesByOng};
}