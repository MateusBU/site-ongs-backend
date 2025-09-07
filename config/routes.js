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
        .delete(app.api.ongs.remove)
        .get(app.api.ongs.getById)

}