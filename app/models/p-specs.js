const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ProductSpecs = Schema({
    category : { type : mongoose.Types.ObjectId, ref : 'Category', required : true},
    specs : { type : String, required : true},
    label : { type : String }
}, {
    toJSON : { virtuals : true}
});

ProductSpecs.plugin(mongoosePaginate);

ProductSpecs.virtual('details', {
    ref : 'ProductDetails',
    localField : '_id',
    foreignField : 'specs'
})

module.exports = mongoose.model('ProductSpecs', ProductSpecs);
