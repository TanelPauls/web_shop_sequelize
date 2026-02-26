require("dotenv").config();

const express = require('express');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sequelize = require('./utils/db.js');

const models = require('./models/index.js');
sequelize.models = models;

/* sequelize.sync({force: true})
  .then(() => {
    console.log('Tabelid on loodud.');
    app.listen(7013, "0.0.0.0", () => {
      console.log('App is started at http://localhost:7013');
    });
  })
  .catch((error) => {
    console.error(error);
  }); */
app.use((req, res, next) => {
    models.User.findByPk(1).then(user=>{
        req.user = user;
        next();
    }).catch(err => console.log(err));
})

const productAdminRoutes = require('./routes/admin/products.js');
const productRoutes = require('./routes/products.js');
const shopRoutes = require ('./routes/shop.js');

app.use('/admin', productAdminRoutes);
app.use(productRoutes);
app.use(shopRoutes);

sequelize.sync({force: true}).then(()=> {
    return models.User.findByPk(1);
}).then(user => {
    if(!user){
        return models.User.create({
            name: 'user',
            email: 'user@local.com'
        });
    }
    return user;
}).then((user)=>{
    return user.createCart();
}).then((cart)=>{
    app.listen(7013, "0.0.0.0", () => {
      console.log('App is started at http://localhost:7013');
    });
}).catch((error) => {
    console.error(error);
  });

app.get('/', (req, res) => {
    res.json({message: 'web shop app'});
});

