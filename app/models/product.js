const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = Schema({
    fname : { type : String, required : true},
    ename : { type : String, required : true},
    details : [{ type : Schema.Types.ObjectId, ref : 'Details', required : true}],
    image : [{ type : String, required : true}]
});

module.exports = mongoose.model('Product', Product);