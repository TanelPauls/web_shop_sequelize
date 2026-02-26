require("dotenv").config();

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = require('./utils/db.js');
sequelize.authenticate().then(() => {
    console.log('Connected to the database.');}).catch(err => {
    console.error('Unable to connect to database', err);
    });


app.get('/', (req, res) => {
    res.json({message: 'web shop app'});
});

app.listen(7013, "0.0.0.0", ()=>{
    console.log('App is started at http://localhost:7013')
})