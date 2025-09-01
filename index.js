const app = require('express')()
const consign = require('consign'); //Is a Node.js module that helps automatically load scripts (like routes, models, controllers, etc.) into Express app.

consign()
    .then('./config/middlewares.js')
    .then('./api') //every folder from api is loaded by consign
    .then('./config/routes.js')
    .into(app); //same name of ./config/middlewares (module.exporst)


//port 3000
app.listen(3000, () =>{
    console.log('Backend...');
});