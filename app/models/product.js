const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Product = Schema({
    fname : { type : String, required : true},
    ename : { type : String, required : true},
    brand : { type : Schema.Types.ObjectId, ref : 'Brand'},
    category : { type : Schema.Types.ObjectId, ref : 'Category'},
    attribute : [{ type : Schema.Types.ObjectId, ref : 'ProductAttribute', required : true}],
    description : { type : String, required : true},
    rate : { type : Number, defualt : null},
    details : [{ type : Schema.Types.ObjectId, ref : 'Details', required : true}],
    original : { type : String, required : true},
    images : [{ type : Schema.Types.ObjectId, ref : 'Multimedia'}],
    commentCount : { type : Number, default : 0},
    soldCount : { type : Number , default : 0},
    viewCount : { type : Number, default : 0}
}, {
    timestamps : true,
    toJSON : { virtuals : true}
});

Product.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', Product);