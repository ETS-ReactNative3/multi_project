const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Brand = Schema({
    category : [{ type : mongoose.Types.ObjectId, ref : 'Category'}],
    name : { type : String, required : true},
    label : { type : String},
    image : { type : String, required : true}
});

Brand.plugin(mongoosePaginate);

module.exports = mongoose.model('Brand', Brand);