require("dotenv").config();

const express = require('express');
const productAdminRoutes = require('./routes/admin/products.js');
const productRoutes = require('./routes/products.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/admin', productAdminRoutes);
app.use(productRoutes);

const sequelize = require('./utils/db.js');

const models = require('./models/index.js');
sequelize.models = models;

sequelize.sync()
  .then(() => {
    console.log('Tabelid on loodud.');
    app.listen(7013, "0.0.0.0", () => {
      console.log('App is started at http://localhost:7013');
    });
  })
  .catch((error) => {
    console.error(error);
  });

app.get('/', (req, res) => {
    res.json({message: 'web shop app'});
});

