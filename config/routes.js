//app is the same from index.js

module.exports = app =>{

    //when some request from url /users, post is used
    app.route('/users')
        .post(app.api.user.save) //it is possible, because of consign. api is the folder
}