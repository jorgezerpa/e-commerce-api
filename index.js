const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const routerApi = require('./routes');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

routerApi(app);

app.listen(PORT, ()=>{
    console.log('app listen on port ' + PORT)
})