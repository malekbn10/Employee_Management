const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


require('dotenv/config');
const api= process.env.API_URL;



//Employee Route
const employeesRouter = require('./routes/employe');


//middleware


mongoose.connect('mongodb://127.0.0.1:27017/employee')
.then(() => {
    console.log('DB connection is ready...');
})
.catch(err => {
    console.log(err);
});
app.use(bodyParser.json());
app.use(`${api}/employees`, employeesRouter);



app.listen(3000 , ()=>{
    console.log('Server is running on port 3000');
});
