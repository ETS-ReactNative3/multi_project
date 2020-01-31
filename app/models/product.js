const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = Schema({
    fname : { type : String, required : true},
    ename : { type : String, required : true},
    brand : { type : Schema.Types.ObjectId, ref : 'Brand'},
    category : [{ type : Object, required : true}],
    attribute : [{ type : Object, defualt : null}],
    description : { type : String, required : true},
    rate : { type : Number, defualt : null},
    details : [{ type : Schema.Types.ObjectId, ref : 'Details', required : true}],
    image : [{ type : String, required : true}]
});

module.exports = mongoose.model('Product', Product);