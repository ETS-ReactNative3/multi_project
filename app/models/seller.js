const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Seller = new Schema({
    category : { type : Schema.Types.ObjectId, ref : 'Category'},
    name : { type : String, required : true},
    label : { type : String}
}, {
    timestamps : true
})

module.exports = mongoose.model('Seller', Seller);