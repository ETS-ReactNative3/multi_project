const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = Schema({
    att : [{ type : Object}]
});

module.exports = mongoose.model('Product', Product);