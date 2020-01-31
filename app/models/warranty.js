const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Warranty = new Schema({
    name : { type : String, required : true},
    label : { type : String}
})

module.exports = mongoose.model('Warranty', Warranty)