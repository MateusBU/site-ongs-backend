//app is the same from index.js

module.exports = app =>{

    /*--------------------------*/
    //          USERS           //
    /*--------------------------*/
    
    //when some request from url /users, post is used
    app.route('/users')
        .post(app.api.user.save) //it is possible, because of consign. api is the folder
        .get(app.api.user.get)

    app.route('/users/:id')
        .get(app.api.user.getById)
        .put(app.api.user.save)
        .delete(app.api.user.remove)


    /*--------------------------*/
    //           ONGS           //
    /*--------------------------*/

    app.route('/ongs')
        .post(app.api.ongs.save)

    app.route('/ongs/:id')
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
        

    /*--------------------------*/
    //          ADDRESS         //
    /*--------------------------*/

    app.route('/addressOng')
        .post(app.api.addressOng.save)
    
    app.route('/addressOng/:id')
        .get(app.api.addressOng.getById)
        .put(app.api.addressOng.save)
        .delete(app.api.addressOng.remove)

    /*--------------------------*/
    //      SOCIAL MEDIA        //
    /*--------------------------*/

    app.route('/socialMediaOng')
        .post(app.api.socialMediaOng.save)
    
    app.route('/socialMediaOng/:id')
        .get(app.api.socialMediaOng.getById)
        .put(app.api.socialMediaOng.save)
        .delete(app.api.socialMediaOng.remove)
}