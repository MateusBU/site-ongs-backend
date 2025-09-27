module.exports = app =>{

    const maxImagesPerOng = 10;

    const save = async(req, res) =>{
        const imageOng = sanitizeObject(req.body); //json on url
        if(req.params.id) imageOng.id = req.params.id;
    
        try{
            existsOrError(imageOng.ongId, 'Ong is required');  
            
            const ongFromDB = await app.db('ongs') //db is a way to access knex
                .where({id: imageOng.ongId}).first();
            existsOrError(ongFromDB, 'Ong does not exist');  
        }
        catch(msg){
            return res.status(400).send(msg);
        }
        
        const images = await app.db('imagesOngs')
            .where({ongId: imageOng.ongId})
            .count('id').first()
        
        const imagesOngsTotal = parseInt(images.count);

        if(imageOng.id){
            app.db('imageOngs')
                .update(imageOng)
                .where({id: imageOng})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
        else if(imagesOngsTotal >= maxImagesPerOng){
            return res.status(400).send('Maximum number of images per Ong reached')
        }
        else{
            app.db('imageOngs')
                .insert(imageOng)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));

        }
    }

    const remove = async(req, res) =>{
        try{
            const imageOng = {...req.body};
            if(req.params.id) imageOng.id = req.params.id

            const ongsDeleted = await app.db('imageOngs')
                .where({id: imageOng.id}).del()
            
            try{
                existsOrError(ongsDeleted, 'image not found')
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
        const image = {...req.body};
        if(req.params.id) image.id = req.params.id

        app.db('imageOngs')
            .where.db({id: image.id})
            .first()
            .then(imageOng => res.json(imageOng))
            .catch(err => res.status(500).send(err));
    }

    const getImagesByOng = (req, res) =>{
        const ongId = req.params.id;

        app.db('imageOngs')
            .where({ongId: ongId})
            .first()
            .then(imgRes => res.json(imgRes))
            .catch(err => res.status(500).send(err));
    }

    return{save, remove, getById, getImagesByOng};
}