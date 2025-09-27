//app is the same from index.js

module.exports = app =>{

    /*--------------------------*/
    //          USERS           //
    /*--------------------------*/
    
    //when some request from url /users, post is used
    app.route('/users') //OK
        .post(app.api.user.save) //it is possible, because of consign. api is the folder
        .get(app.api.user.get)

    app.route('/users/:id') //OK
        .get(app.api.user.getById)
        .put(app.api.user.save)
        .delete(app.api.user.remove)


    /*--------------------------*/
    //           ONGS           //
    /*--------------------------*/

    app.route('/ongs') //OK
        .post(app.api.ongs.save)
        .get(app.api.ongs.get)

    app.route('/ongs/:id') //OK
        .put(app.api.ongs.save)
        .delete(app.api.ongs.remove)
        .get(app.api.ongs.getById)

    app.route('/ongs/:id/imagesOng') //TODO fazer algo para retornar as imagens de cada ong, assim como o endereço?
    
        
    /*--------------------------*/
    //          IMAGES          //
    /*--------------------------*/
        
    app.route('/imagesOng')
        .post(app.api.imageOng.save)
        
    app.route('/imagesOng/:id')
        .get(app.api.imageOng.getById)
        .put(app.api.imageOng.save)
        .delete(app.api.imageOng.remove)
        
    app.route('/ongs/:id/imagesOng')
        .get(app.api.imageOng.getImagesByOng)
    /*--------------------------*/
    //          ADDRESS         //
    /*--------------------------*/

    app.route('/addressOng') //OK
        .post(app.api.addressOng.save)
    
    app.route('/addressOng/:id') //OK
        .get(app.api.addressOng.getById)
        .put(app.api.addressOng.save)
        .delete(app.api.addressOng.remove)

    app.route('/ongs/:id/addressesOng')
        .get(app.api.addressOng.getAddressesByOng)
        
    /*--------------------------*/
    //      SOCIAL MEDIA        //
    /*--------------------------*/

    app.route('/socialMediaOng') //OK
        .post(app.api.socialMediaOng.save)
    
    app.route('/socialMediaOng/:id') //OK
        .get(app.api.socialMediaOng.getById)
        .put(app.api.socialMediaOng.save)
        .delete(app.api.socialMediaOng.remove)
    
    app.route('/ongs/:id/socialMediaOng')
        .get(app.api.socialMediaOng.getSocialMediaByOng)
}