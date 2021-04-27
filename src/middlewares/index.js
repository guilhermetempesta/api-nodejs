const bodyParser = require('body-parser')
const cors = require('cors')
const corsOptions = {
    exposedHeaders: 'Authorization',
};
  
module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors(corsOptions))
    app.disable('x-powered-by')
}