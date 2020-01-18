const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ProductSpecs = Schema({
    category : { type : mongoose.Types.ObjectId, ref : 'Category'},
    specs : { type : String, required : true},
    label : { type : String }
});

ProductSpecs.plugin(mongoosePaginate);

module.exports = mongoose.model('ProductSpecs', ProductSpecs);
