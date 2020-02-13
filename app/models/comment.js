const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Comment = Schema({
    user : { type : Schema.Types.ObjectId, ref : 'User'},
    product : { type : Schema.Types.ObjectId, ref : 'Product'},
    survey : [{ type : Schema.Types.ObjectId, ref : 'Vsurvey'}],
    title : { type : String, required : true},
    description : { type : String, required : true},
    like : { type : Number},
    dislike : { type : Number},
    negative : [{ type : String},],
    positive : [{ type : String},],
    check : { type : Boolean, default : false},
}, {
    timestamps : true
})

Comment.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', Comment)
