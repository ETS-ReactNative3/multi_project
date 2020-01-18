const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ProductDetails = Schema({
    specs : { type : mongoose.Types.ObjectId, ref : 'ProductSpecs'},
    name : { type : String, required : true},
    label : { type : String }
});

ProductDetails.plugin(mongoosePaginate);

module.exports = mongoose.model('ProductDetails', ProductDetails);
