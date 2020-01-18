const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Survey = Schema({
    category : { type : mongoose.Types.ObjectId, ref : 'Categroy'},
    name : { type : String, required : true},
    label : { type : String}
})

module.exports = mongoose.model('Survey', Survey);