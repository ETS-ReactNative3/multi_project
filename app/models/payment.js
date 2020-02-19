const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderStatus = require('app/models/order-status');
const status_def = OrderStatus.findOne({ default : true});

const Payment = Schema({
    user : { type : Schema.Types.ObjectId, ref : 'User'},
    product : { type : Schema.Types.ObjectId, ref : 'Product'},
    payment : { type : Boolean, default : false},
    resnumber : { type : String, required : true},
    attribute : [{ type : Schema.Types.ObjectId, ref : 'ProductAttribute'}],
    discount : { type : Number, default : 0},
    count : { type : Number, required : true , default : 1},
    price : { type : Number, required : true},
    receptor : { type : Schema.Types.ObjectId, ref : 'Receptor'},
    orderStatus : { type : Schema.Types.ObjectId, ref : 'OrderStatus', default : `${status_def._id}`}
}, {
    timestamps : true
})

module.exports = mongoose.model('Payment', Payment);