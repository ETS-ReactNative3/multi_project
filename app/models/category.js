const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const Category = Schema({
    name : { type : String, required : true},
    label : { type : String},
    parent : { type : mongoose.Types.ObjectId, ref : 'Category', default : undefined},
    subcategory : { type : mongoose.Types.ObjectId, ref : 'Category', default : undefined}
}, {
    timestamps : true,
    toJSON : true
});

Category.plugin(mongoosePaginate);


module.exports = mongoose.model('Category' , Category);