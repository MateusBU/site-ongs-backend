module.exports = app =>{

    const {sanitizeObject} = app.api.sanitize;

    const {existsOrError, isSocialMediaOrError} = app.api.validation;


    const save = async (req, res) =>{
        const socialMedia = sanitizeObject(req.body);
        if(req.params.id) socialMedia.id = req.params.id;


        const maxLength = 100;
        try{
            // Verify if all required fields are provided and valid
            existsOrError(socialMedia.ongId, 'Ong is required');
            isSocialMediaOrError(socialMedia.instagram, 'instagram.com', 'Not a properly Instagram url');
            isSocialMediaOrError(socialMedia.facebook, 'facebook.com', 'Not a properly Facebook url');
            isSocialMediaOrError(socialMedia.twitter, 'x.com', 'Not a properly Twitter/X url');
            isSocialMediaOrError(socialMedia.tiktok, 'tiktok.com', 'Not a properly Tiktok url');
            isSocialMediaOrError(socialMedia.youtube, 'youtube.com', 'Not a properly Youtube url');

            const ongFromDB = await app.db('ongs') //db is a way to access knex
                .where({id: socialMedia.ongId}).first();
            existsOrError(ongFromDB, 'Ong does not exist');
            
        }
        catch(msg){
            return res.status(400).send(msg);
        }

        if(socialMedia.id){
            app.db('socialMediaOng')
                .update(socialMedia)
                .where({id: socialMedia.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
        else{
            app.db('socialMediaOng')
                .insert(socialMedia)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    const remove = async(req, res) =>{
        try{
            const socialMedia = {...req.body};
            if(req.params.id) socialMedia.id = req.params.id

            const socialMediasDeleted = await app.db('socialMediaOng')
                .where({id: socialMedia.id}).del()
            
            try{
                existsOrError(socialMediasDeleted, 'Social Media not found')
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
        const socialMedia = {...req.body};
        if(req.params.id) socialMedia.id = req.params.id

        app.db('socialMediaOng')
            .where({id: socialMedia.id})
            .first()
            .then(addRes => res.json(addRes))
            .catch(err => res.status(500).send(err));
    }


    return{save, remove, getById};
}