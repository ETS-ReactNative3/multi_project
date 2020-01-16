const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ProductDetails = Schema({
    category : { type : mongoose.Types.ObjectId, ref : 'CAtegory'},
    name : { type : String, required : true},
    description : [{type : String}]
});

ProductDetails.plugin(mongoosePaginate);

module.exports = mongoose.model('ProductDetails', ProductDetails);
