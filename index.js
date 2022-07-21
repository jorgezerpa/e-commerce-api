const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomError} = require('./middlewares/errorHandler');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use('/static', express.static('public'));
routerApi(app);

app.use(logErrors);
app.use(boomError);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log('app listen on port ' + PORT)
})