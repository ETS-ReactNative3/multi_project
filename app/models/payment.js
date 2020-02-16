const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Payment = Schema({
    user : { type : Schema.Types.ObjectId, ref : 'User'},
    product : { type : Schema.Types.ObjectId, ref : 'Product'},
    payment : { type : Boolean, default : false},
    resnumber : { type : String, required : true},
    attribute : [{ type : Schema.Types.ObjectId, ref : 'ProductAttribute'}],
    discount : { type : Number, default : 0},
    count : { type : Number, required : true , default : 1},
    price : { type : Number, required : true},
    receptor : { type : Schema.Types.ObjectId, ref : 'Receptor'}

}, {
    timestamps : true
})

module.exports = mongoose.model('Payment', Payment);