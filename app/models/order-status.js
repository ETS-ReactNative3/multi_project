const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderStatus = Schema({
    name : { type : String, required : true},
    image : { type : String, required : true},
    default : { type : Boolean, default : false}
})

module.exports = mongoose.model('OrderStatus', OrderStatus);