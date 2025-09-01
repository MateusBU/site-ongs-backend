const bodyParser = require('body-parser'); //This configures Express to parse JSON in the request body
const cors = require('cors'); //This allows other domains to access API, for example, Vue frontend running at localhost:5173 accessing your API at localhost:3000

//app is the same from index.js
module.exports = app =>{
    app.use(bodyParser.json())
    app.use(cors())
}