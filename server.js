const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const company = require('./routes/api/company');
const product = require('./routes/api/product');
const customer = require('./routes/api/customer');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// Use Routes
app.use('/api/company', company);
app.use('/api/product', product);
app.use('/api/customer', customer);

app.get('/', function(req, res) {
    res.status(200).send('Welcome to the DT Digital');
  })

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
