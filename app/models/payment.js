const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Payment = Schema({
    user : { type : Schema.Types.ObjectId, ref : 'User'},
    product : { type : Schema.Types.ObjectId, ref : 'Product'},
    payment : { type : Boolean, default : false},
    resnumber : { type : String, required : true},
    price : { type : Number, required : true}

}, {
    timestamps : true
})

module.exports = mongoose.model('Payment', Payment);