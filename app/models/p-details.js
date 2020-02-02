const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ProductDetails = Schema({
    specs : { type : mongoose.Types.ObjectId, ref : 'ProductSpecs'},
    name : { type : String, required : true},
    label : { type : String }
}, {
    toJSON : { virtuals : true}
});

ProductDetails.plugin(mongoosePaginate);

ProductDetails.virtual('p_specs', {
    ref : 'ProductSpecs',
    localField : 'specs',
    foreignField : '_id'
})

module.exports = mongoose.model('ProductDetails', ProductDetails);
