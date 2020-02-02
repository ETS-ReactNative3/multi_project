const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Product = Schema({
    fname : { type : String, required : true},
    ename : { type : String, required : true},
    brand : { type : Schema.Types.ObjectId, ref : 'Brand'},
    category : { type : Schema.Types.ObjectId, ref : 'Category'},
    attribute : [{
        seller : { type : Schema.Types.ObjectId, ref : 'Seller'},
        warranty : { type : Schema.Types.ObjectId, ref : 'Warranty'},
        color : { type : String, required : true},
        price : { type : String, required : true},
        discount : { type : Number, defualt : 0},
        stock : { type : Number, defualt : 0}
    }],
    description : { type : String, required : true},
    rate : { type : Number, defualt : null},
    details : [{ type : Schema.Types.ObjectId, ref : 'Details', required : true}],
    image : [{ type : String, required : true}]
}, {
    timestamps : true,
    toJSON : { virtuals : true}
});

Product.plugin(mongoosePaginate);

Product.virtual('info_attribute', {
    ref : 'Seller',
    localField : 'attribute.seller',
    foreignField : '_id'
})





module.exports = mongoose.model('Product', Product);