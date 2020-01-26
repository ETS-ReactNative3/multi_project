const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const Category = Schema({
    name : { type : String, required : true},
    label : { type : String},
    parent : { type : Schema.Types.ObjectId, ref : 'Category'},
}, {
    timestamps : true,
    toJSON : { virtuals : true}
});

Category.plugin(mongoosePaginate);

Category.virtual('p', {
    ref : 'Category',
    localField : '_id',
    foreignField : 'parent'
})



module.exports = mongoose.model('Category' , Category);