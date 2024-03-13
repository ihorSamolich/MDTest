const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 3000;

const sequelize = new Sequelize('MedecineDB', 'dbmasteruser', 'ikOdaUH{DUF&Vmi#W<R#`DFMizJ1bD(c', {
    host: 'ls-9b84d96d34e6eb6ed1618a034a0675238b57ec77.c3s2y40g68e6.us-east-1.rds.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

const models = {
    Pharmacy: require('./models/Pharmacy')(sequelize),
    Medication: require('./models/Medication')(sequelize),
    OrderData: require('./models/OrderData')(sequelize),
    OrderItem: require('./models/OrderItem')(sequelize),
};

Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/images', express.static('images'));

app.use('/api/pharmacies', pharmacyRoutes(models));
app.use('/api/medications', medicationRoutes(models));
app.use('/api/orders', orderRoutes(models));



sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing with database:', error);
    });
