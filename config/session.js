const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo')(session);

module.exports = {
    secret : 'SecretID',
    resave : false,
    saveUninitialized : true,
    store : new connectMongo({mongooseConnection : mongoose.connection}),
}
