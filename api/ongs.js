
module.exports = app =>{

    const {sanitizeObject} = app.api.sanitize;

    const {existsOrError, notExistsOrError, equalsOrError, 
        notEqualsOrError, isSmallerThanOrError
    } = app.api.validation;


    const save = async(req, res) =>{
    
        const ong = sanitizeObject(req.body); //
        if(req.params.id) ong.id = req.params.id;

        const maxLength = 100;
        try{
            existsOrError(ong.name, 'Name is required');
            isSmallerThanOrError(ong.name, maxLength, `Name is too long. It must be smaller than ${maxLength}`);
            existsOrError(ong.description, 'Description is required');
            existsOrError(ong.userId, 'User is required');
            existsOrError(ong.helpedAnimals, 'It is required to have, at least, one kind of animal');

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
                .where({id: ong.id})
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

    const get = async (req, res) =>{

        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            // filters
            const animals = req.query.animals ? req.query.animals.split(',').map(a => a.trim()) : [];
            const cities = req.query.cities ? req.query.cities.split(',') : [];


            let query = app.db('ongs')
                .select('id', 'name', 'number1', 'number2', 'description', 'logoOng' ,'helpedAnimals')
                .limit(limit)
                .offset(offset);
                
                
            // Filtering by animals
            if (animals.length > 0) {
                const pgArray = 'ARRAY[' + animals.map(() => '?').join(',') + ']';
                query.whereRaw('"helpedAnimals" && ' + pgArray, animals);
            }

            // Filtering by cities
            if (cities.length > 0) {
                query.distinct('ongs.*')
                    .join('addressOng', 'ongs.id', '=', 'addressOng.ongId')
                    .whereIn('addressOng.city', cities);
            }

            const result = await query;
            let countQuery1 = app.db('ongs').count('ongs.id as count')

            if (animals.length > 0) {
                const pgArray = 'ARRAY[' + animals.map(() => '?').join(',') + ']';
                countQuery1.whereRaw('"helpedAnimals" && ' + pgArray, animals);
            }

            if (cities.length > 0) {
                countQuery1.join('addressOng', 'ongs.id', '=', 'addressOng.ongId')
                    .whereIn('addressOng.city', cities);
            }

            const [{ count }] = await countQuery1;
  
            res.json({
                data: result,
                total: parseInt(count),
                page,
                totalPages: Math.ceil(count / limit)
            });
        } 
        catch (err) {
            console.error('Erro na query:', err);
            res.status(500).send(err)
        }
    }

    return{save, remove, getById, get};
};
