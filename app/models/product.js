const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = Schema({
    fname : { type : String, required : true},
    ename : { type : String, required : true},
    brand : { type : Schema.Types.ObjectId, ref : 'Brand'},
    category : [{ type : Object, required : true}],
    attribute : [{ type : Object, defualt : null}],
    seller : { type : Schema.Types.ObjectId, ref : 'Seller'},
    warranty : { type : Schema.Types.ObjectId, ref : 'Warranty'},
    price : { type : Number, required : true},
    description : { type : String, required : true},
    rate : { type : Number, defualt : null},
    discount : { type : Number, defualt : 0},
    details : [{ type : Schema.Types.ObjectId, ref : 'Details', required : true}],
    stock : { type : Number, default : 0},
    image : [{ type : String, required : true}]
});

module.exports = mongoose.model('Product', Product);