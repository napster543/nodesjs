'use strict'

const express = require('express');
const bodyparser = require('body-parser');
const app= express();
//const Product = require('./models/product');
const api = require('./routers')

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/api', api)


module.exports = app