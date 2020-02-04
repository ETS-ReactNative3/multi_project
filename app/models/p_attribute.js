const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductAttribute = Schema({
    seller : { type : Schema.Types.ObjectId, ref : 'Seller'},
    warranty : { type : Schema.Types.ObjectId, ref : 'Warranty'},
    color : { type : String, required : true},
    price : { type : String, required : true},
    discount : { type : Number, defualt : 0},
    stock : { type : Number, defualt : 0}
})

module.exports = mongoose.model('ProductAttribute', ProductAttribute);