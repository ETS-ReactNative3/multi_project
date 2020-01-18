const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Details = Schema({
    p_details : { type : Schema.Types.ObjectId, ref : 'ProductDetails'},
    value : { type : String, required : true},
    label : { type : String}
});

module.exports = mongoose.model('Details', Details);